import { IsNotEmpty, IsString } from 'class-validator';

export class LoginClientDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
