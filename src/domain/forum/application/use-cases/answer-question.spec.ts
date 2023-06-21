import { Answer } from "../../enterprise/entities/answer"
import { IAnswersRepository } from "../repositories/answers-repository"
import { AnswerQuestionUseCase } from "./answer-question"

const fakeAnswersRepository: IAnswersRepository = {
  create: async function (answer: Answer): Promise<void> { },
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
