import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsDefined({ message: 'Must provide name' })
  @IsString()
  name: string;

  @IsDefined({ message: 'Must provide username' })
  @IsString()
  @MinLength(5)
  username: string;

  @IsDefined({ message: 'Must provide field email' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Must provide field password' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  password: string;

  @IsDefined({ message: 'Must provide field position' })
  @IsString()
  @MinLength(5)
  position: string;

  @IsDefined({ message: 'Must provide field department' })
  @IsString()
  @MinLength(5)
  department: string;
}
