import { Answer } from "../entities/answer"
import { IAnswersRepository } from "../repositories/answers-repository"

interface IAnswerQuestionUseCase {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: IAnswersRepository
  ) { }

  async execute({ instructorId, questionId, content }: IAnswerQuestionUseCase) {
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId
    })

    await this.answersRepository.create(answer)

    return answer
  }
}