import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./category.schema";
import { CreateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) { }

    async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
        return await this.categoryModel.create(dto);
    }

    async findAll(): Promise<CategoryDocument[]> {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<CategoryDocument | null> {
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, dto: CreateCategoryDto): Promise<CategoryDocument | null> {
        return this.categoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.categoryModel.findByIdAndDelete(id).exec();
    }
}