
import { Answer } from "../../enterprise/entities/answer";
import { IAnswersRepository } from "../repositories/answers-repository";

interface IEditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type IEditAnswerUseCaseResponse = {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    authorId,

    content,
    answerId
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed.')
    }


    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer
    }
  }
}