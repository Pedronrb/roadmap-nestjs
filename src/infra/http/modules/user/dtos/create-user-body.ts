import { ApiProperty } from '@nestjs/swagger';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/is-email-custom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/is-not-empty-custom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/is-string-custom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/min-length-custom';

export class CreateUserBody {
  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
  
}
