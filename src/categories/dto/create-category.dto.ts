import { IsNotEmpty, IsString } from "class-validator";
// import { Article } from "entities/article.entity";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly nom: string;

    // @IsNotEmpty()
    // readonly articles: Article[];
}
