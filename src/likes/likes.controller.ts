import { AuthGuard } from './../middleware/auth.guard';
import { LikesService } from './likes.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { customPlaceId } from 'src/util/customIdGenerartor';

@Controller('user/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getLikes(@Req() req, @Res() res: Response) {
    try {
      const account_id = req.account_id;
      const response = await this.likesService.getLikeShopByUser({
        account_id,
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async addLikes(@Req() req, @Body() body, @Res() res: Response) {
    try {
      const account_id = req.account_id;
      const place_id = customPlaceId(body);
      const likeShopData = { account_id, place_id };

      const response = await this.likesService.addLikeShop(likeShopData);

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send();
    }
  }

  @Delete(':place_id')
  @UseGuards(AuthGuard)
  async deleteLikes(
    @Req() req,
    @Param('place_id') place_id,
    @Res() res: Response,
  ) {
    try {
      const account_id = req.account_id;
      const likeShopData = { account_id, place_id };

      const response = await this.likesService.deletelikeShop(likeShopData);

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err.response);
    }
  }
}
