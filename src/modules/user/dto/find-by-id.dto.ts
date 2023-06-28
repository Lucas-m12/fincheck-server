import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindByIdDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
