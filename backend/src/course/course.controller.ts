import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() body: CreateCourseDto) {
    return this.courseService.create(body);
  }

  @Get()
  async findAll() {
    return this.courseService.findAll();
  }
}