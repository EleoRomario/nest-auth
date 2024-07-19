import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsUUID()
  @IsNotEmpty()
  role: string;

  @IsBoolean()
  isActive: boolean;
}
