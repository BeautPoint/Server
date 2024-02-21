import { AuthGuard } from './../middleware/auth.guard';
import { TokenService } from './../token/token.service';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('/profile')
  async getUser(@Req() req, @Res() res: Response) {
    try {
      const account_id = req.account_id;
      console.log('userController : ', account_id);
      const response = await this.userService.getProfile(account_id);
      return res.status(200).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(404).send({ message: err });
    }
  }

  @Patch('/profile')
  async updateUser(@Body() body: Body, @Req() req, @Res() res: Response) {
    try {
      const { account_id } = req.account_id;
      const profileData = { body, account_id };
      const response = await this.userService.updateProfile(profileData);
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
