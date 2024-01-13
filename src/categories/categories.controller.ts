import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateCategoryDto } from './dto/create-category.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() CreateCategoryDto: CreateCategoryDto) {
    try {
      const result = this.categoriesService.create(CreateCategoryDto);
      return {
        success: true,
        message: 'Article créé avec succès',
        data: { result },
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Erreur de création de l\'article',
        data: { err },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.categoriesService.findAll();
      // result.then((value:any)=>{
      //     list = value
      // })
      return result
    } catch (err) {
      return {
        success: false,
        message: 'Erreur de récupération des articles',
        data: { err },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.categoriesService.findOne(+id);
      // const response = {
      //   success: true,
      //   message: 'Article récupéré avec succès',
      //   data: { result },
      //   status: HttpStatus.CREATED,
      // };
      return result
    } catch (err) {
      return {
        success: false,
        message: 'Erreur de récupération de l\'article',
        data: { err },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCategoryDto: UpdateCategoryDto) {
    try {
      const result = this.categoriesService.update(+id, UpdateCategoryDto);
      return {
        success: true,
        message: 'Article modifié avec succès',
        data: { result },
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Erreur de modification de l\'article',
        data: { err },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.categoriesService.remove(+id);
      return {
        success: true,
        message: 'Article supprimé avec succès',
        data: { result },
        status: HttpStatus.CREATED,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Erreur de suppression de l\'article',
        data: { err },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
