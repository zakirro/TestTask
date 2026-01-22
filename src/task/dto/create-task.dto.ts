import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;
}
