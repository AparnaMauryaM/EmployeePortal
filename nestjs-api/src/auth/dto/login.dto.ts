import { IsDefined, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsDefined({ message: 'Must provide username' })
  @IsString()
  @MinLength(5)
  username: string;

  @IsDefined({ message: 'Must provide password' })
  @IsString()
  @MinLength(8)
  password: string;
}
