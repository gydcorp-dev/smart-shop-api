import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CohereClient, CohereError, CohereTimeoutError } from 'cohere-ai'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) { }
  about(datas: any) {
    const { companyData, question } = datas
    const cohere = new CohereClient({
      token: "YOUR_API_KEY",
    });

    (async () => {
      try {
        const resp = await cohere.generate(
          {
            model: "xlarge",
            prompt: `Ce programme répondra aux questions en fonction des données fournies en français:\n\nData: Données : Siemens AG est une société allemande multinationale et le plus grand groupe industriel d'Europe, dont le siège est à Munich, avec des succursales à l'étranger. Siemens & Halske a été fondée par Werner von Siemens et Johann Georg Halske le 1er octobre 1847. Les principales divisions de l'entreprise sont l'Industrie, l'Énergie, la Santé (Siemens Healthineers) et l'Infrastructure et les Villes, qui représentent les principales activités de l'entreprise. L'entreprise est un fabricant de premier plan d'équipements de diagnostic médical et sa division de soins de santé, qui représente environ 12 % du chiffre d'affaires total de l'entreprise, est sa deuxième unité la plus rentable, après la division de l'automatisation industrielle. Dans ce domaine, elle est considérée comme une pionnière et l'entreprise ayant le plus haut chiffre d'affaires au monde. L'entreprise est un composant de l'indice boursier Euro Stoxx 50. Siemens et ses filiales emploient environ 303 000 personnes dans le monde entier et ont réalisé un chiffre d'affaires mondial d'environ 62 milliards d'euros en 2021, selon son rapport de résultats.\n\nQuestion: Quand l'entreprise a-t-elle été fondée ?\nAnswer: Le 1er octobre 1847.\n--\nQuestion:  Comment ça va ?\nAnswer: Cette question n'est pas liée à l'entreprise.\n--\nQuestion: Qui était/sont le(s) fondateur(s) ?\nAnswer: Werner von Siemens et Johann Georg Halske\n--\nData:${companyData}\nQuestion: ${question}?\nAnswer:`,
            maxTokens: 300,
            temperature: 0.6,
            k: 0,
            p: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
            stopSequences: ["--"],
            returnLikelihoods: "NONE",
          }
        );
        return {
          success: false,
          response: resp.generations[0]
        };
      } catch (err) {
        if (err instanceof CohereTimeoutError) {
          return {
            success: false,
            error: "TIMED_OUT"
          };
        } else if (err instanceof CohereError) {
          // catch all errors
          const error = {
            status: err.statusCode,
            message: err.message,
            content: err.body
          }
          return {
            success: false,
            error: error
          }
        }
      }
    })();
  }

  async descript(body: any) {
    const { nom, category, prix } = body
    const cohere = new CohereClient({
      token: "KAgHUCLsg1vvbYKqyskoZBRj5IvxZtnmHx2QtEOY",
    });

    // (async () => {
    try {
      const resp = await cohere.generate(
        {
          // model: "xlarge",
          prompt: `Craft a compelling description for a product on an e-commerce platform using the following variables:
          Name: ${nom}
          Price: ${prix}
          Category: ${category}
          Create a captivating narrative that grabs the attention of potential buyers and encourages them to learn more about this irresistible offer.`,
          temperature: 0.6,
          // k: 0,
          // p: 1,
          // frequencyPenalty: 0,
          // presencePenalty: 0,
          // stopSequences: ["--"],
          // returnLikelihoods: "NONE",
        }
      );
      return resp.generations[0];
    } catch (err) {
      if (err instanceof CohereTimeoutError) {
        return {
          success: false,
          error: "TIMED_OUT"
        };
      } else if (err instanceof CohereError) {
        // catch all errors
        const error = {
          status: err.statusCode,
          message: err.message,
          content: err.body
        }
        return {
          success: false,
          error: error
        }
      }
    }
    // })();
  }

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepository.save(createArticleDto);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  async findOne(id: number) {
    return await this.articleRepository.findBy({ id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepository.update({ id }, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepository.delete({ id });
  }
}
