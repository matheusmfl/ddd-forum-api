import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { IAnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"

interface IAnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface IAnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    instructorId,
    questionId,
    content
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
