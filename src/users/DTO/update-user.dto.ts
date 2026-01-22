import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';


export class UpdateUserDTO {
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsUUID()
    task_id?: string

    @IsEmail()
    email: string;
}