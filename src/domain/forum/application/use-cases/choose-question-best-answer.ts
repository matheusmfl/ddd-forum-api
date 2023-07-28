import { Question } from "../../enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { IAnswersRepository } from "../repositories/answers-repository";

interface IChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(private questionsRepository: IQuestionsRepository,
    private answersRepository: IAnswersRepository) { }

  async execute({
    answerId,
    authorId
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error('question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}