import { AuthGuard } from './../middleware/auth.guard';
import { CommunityService } from './community.service';
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

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('/post')
  async getAllPosts(@Res() res: Response) {
    try {
      const response = await this.communityService.getPosts();
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @Post('/post')
  @UseGuards(AuthGuard)
  async createPost(@Body() body: any, @Req() req, @Res() res: any) {
    try {
      const account_id = req.account_id;
      const postData = { account_id, ...body };
      console.log(postData);
      const response = await this.communityService.createPost(postData);
      return res.status(200).send(response);
    } catch (err) {
      console.log('컨트롤러 에러 :', err);
      return res.status(400).send(err);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPostsByUser(@Req() req, @Res() res: any) {
    try {
      const { account_id } = req.account_id;
      const response = await this.communityService.getPostsByUser(account_id);
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @UseGuards(AuthGuard)
  @Get('post/:postId')
  async getPostsById(@Req() req, @Param('postId') post_id, @Res() res: any) {
    try {
      const account_id = req.account_id;
      const response = await this.communityService.getPostById({
        post_id,
        account_id,
      });

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('post/:postId')
  async updatePost(
    @Req() req,
    @Body() body: any,
    @Param('postId') post_id,
    @Res() res: any,
  ) {
    try {
      const account_id = req.account_id;

      const response = await this.communityService.updatePost({
        body,
        post_id,
        account_id,
      });

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('post/:postId')
  async deletePost(@Req() req, @Param('postId') post_id, @Res() res: any) {
    try {
      const account_id = req.account_id;
      const response = await this.communityService.deletePost({
        post_id,
        account_id,
      });

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
