import { AnswerQuestionUseCase } from './answer-question'
import { IAnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: IAnswersRepository = {
  create: async function (answer: Answer): Promise<void> {
    return
  }
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: "Nova resposta"
  })

  expect(answer.content).toEqual("Nova resposta")
})