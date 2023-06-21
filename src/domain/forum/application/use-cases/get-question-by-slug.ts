import { IQuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"

interface IGetQuestionBySlugRequest {
  slug: string
}

interface IGetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    slug
  }: IGetQuestionBySlugRequest): Promise<IGetQuestionBySlugResponse> {

    const question = await this.questionsRepository.findBySlug(slug)

    if(!question){
      throw new Error("Question not found")
    }

    return { question }
  }
}
