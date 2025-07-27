import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CoursesModule, CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
