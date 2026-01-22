import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description?: string;
}
