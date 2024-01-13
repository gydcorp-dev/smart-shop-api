import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "entities/category.entity";
import { isUnique } from 'src/helpers/unique.validators';

export class CreateArticleDto {
    @IsNotEmpty()
    @isUnique({ tableName: 'article', column: 'nom' })
    @IsString()
    readonly nom: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly file: string;

    @IsNotEmpty()
    @IsNumber()
    prix: number;

    @IsNotEmpty()
    readonly category: Category;
}
