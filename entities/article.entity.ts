import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    file: string;

    @Column({
        type:"longtext"
    })
    description: string;

    @Column()
    prix: number;

    @ManyToOne(() => Category, (category) => category.id, {
        cascade: true,
        eager: true,
    })
    category: Category;
}
