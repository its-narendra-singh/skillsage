import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    instructor: string;

    @IsOptional()
    @IsMongoId()
    categoryId?: string;

    @IsOptional()
    tags?: string[];

    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    publishDate?: Date;
}