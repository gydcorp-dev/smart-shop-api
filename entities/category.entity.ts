import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Article } from "./article.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

//   @OneToMany(() => Article, (article) => article.category, {
//     createForeignKeyConstraints: true,
//   })
//   articles: Article[];
}
