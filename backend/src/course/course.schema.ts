import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    instructor: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    categoryId: Types.ObjectId;

    @Prop({ type: Date })
    publishDate: Date;
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);