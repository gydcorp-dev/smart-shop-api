import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    try {
      const result = this.articlesService.create(createArticleDto);
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

  @Post('about')
  about(@Body() createArticleDto: CreateArticleDto) {
    try {
      const result = this.articlesService.create(createArticleDto);
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

  @Post('descript')
  async descript(@Body() createArticleDto: any) {
    try {
      const result = await this.articlesService.descript(createArticleDto);
      return result;
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
      const result = this.articlesService.findAll();
      return result;
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
      const result = this.articlesService.findOne(+id);
      return result;
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
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    try {
      const result = this.articlesService.update(+id, updateArticleDto);
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
      const result = this.articlesService.remove(+id);
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadCsv(@UploadedFile() file:any) {
    return {
      file: file,
    };
  }

  @Get('/image/:name')
  getStaticFile(@Res() res,@Param('name') name: string): Observable<any> {
    // const file = createReadStream(join(process.cwd(), `images/${name}`));
    return of(res.sendFile(join(process.cwd(), `images/${name}`)));
  }
}
