import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  data: any;

  @IsNotEmpty()
  @IsString()
  type: 'social' | 'general';
}
