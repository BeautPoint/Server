import { AuthGuard } from './../middleware/auth.guard';
import { TokenService } from './../token/token.service';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Headers,
  Req,
  Res,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async All(@Res() res: Response) {
    return res.status(202).send('HII!!');
  }

  @Post('/login')
  async login(@Body() req: Request, @Res() res: Response) {
    try {
      const response = await this.authService.Oauth(req);
      return res.status(202).send(response);
    } catch (err) {
      console.log(err);
      return res.status(404).send({ message: err.message });
    }
  }

  @Get('/decodetoken')
  async decodeToken(@Headers() headers: any, @Res() res: Response) {
    try {
      const access_token = headers['authorization'].split(' ')[1];
      const response = await this.tokenService.decodeToken(access_token);
      return res.status(200).send(response);
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  @Post('/token')
  async getToken(@Body() req: Request, @Res() res: Response) {
    try {
      console.log(req);
      const reponse = await this.tokenService.createTokens(req);
      return res.status(200).send(reponse);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  }

  @Post('/reissuetoken')
  async reissueToken(@Body() body: any, @Res() res: Response) {
    try {
      const response = await this.tokenService.reissueAccessToken(body);
      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  }

  @Post('/signup')
  async signup(@Body() req: Request, @Res() res: Response) {
    try {
      console.log(req);
      await this.authService.createUser(req);
      return res.status(202).send('hi');
    } catch (err) {
      console.log(err.response);
      return res.status(401).send({ message: err });
    }
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Body() body: any, @Res() res: Response) {
    try {
      
    } catch (err) {}
  }
}
