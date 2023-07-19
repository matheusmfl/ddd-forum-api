
import { IQuestionsRepository } from "../repositories/questions-repository";

interface IDeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type IDeleteQuestionUseCaseResponse = {
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}