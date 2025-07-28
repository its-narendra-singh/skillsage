import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    ) { }

    async create(data: Partial<CreateCourseDto>): Promise<CourseDocument> {
        const newCourse = new this.courseModel(data);
        return newCourse.save();
    }

    async findAll(): Promise<CourseDocument[]> {
        return this.courseModel.find().populate('categoryId').exec();
    }
}