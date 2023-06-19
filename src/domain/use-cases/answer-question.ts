import { Answer } from "../entities/answer"

interface IAnswerQuestionUseCase {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: IAnswerQuestionUseCase) {
    const answer = new Answer(content)

    return answer
  }
}