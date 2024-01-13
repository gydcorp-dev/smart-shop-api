import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}
  async create(CreateCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(CreateCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findBy({id});
  }

  async update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update({id},UpdateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete({id});
  }
}
