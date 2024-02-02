import { CommentsService } from './comments.service';
import { AuthGuard } from './../middleware/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('community/post')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(`:postId/comments`)
  @UseGuards(AuthGuard)
  async getCommentById(
    @Req() req,
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    try {
      const account_id = req.account_id;
      const response = await this.commentsService.getCommentById({
        account_id,
        postId,
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @Get(`/comments/user`)
  @UseGuards(AuthGuard)
  async getCommentByUser(@Req() req, @Res() res: Response) {
    try {
      const account_id = req.account_id;
      const response = await this.commentsService.getCommentByUser({
        account_id,
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @Post(':postId/comments')
  @UseGuards(AuthGuard)
  async createComment(
    @Req() req,
    @Body() body: any,
    @Param('postId') post_id,
    @Res() res: Response,
  ) {
    try {
      const account_id = req.account_id;
      const commentData = { account_id, post_id, ...body };
      console.log('commentData : ', commentData);
      const response = await this.commentsService.createComment(commentData);
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @Patch('post/:postId')
  @UseGuards(AuthGuard)
  async editComment(
    @Req() req,
    @Body() body: any,
    @Param('postId') post_id,
    @Res() res: any,
  ) {
    try {
      const account_id = req.account_id;

      const response = '';

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @Delete('comments/:commentId')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Req() req,
    @Param('commentId') comment_id,
    @Res() res: any,
  ) {
    try {
      const account_id = req.account_id;
      console.log(comment_id);
      const response = await this.commentsService.deleteComment({
        account_id,
        comment_id,
      });

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
