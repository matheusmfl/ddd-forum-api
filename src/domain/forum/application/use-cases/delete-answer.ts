
import { IAnswersRepository } from "../repositories/answers-repository";

interface IDeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type IDeleteAnswerUseCaseResponse = {
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    authorId,
    answerId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}