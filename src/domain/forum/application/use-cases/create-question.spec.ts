import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"

const fakeQuestionsRepository: IQuestionsRepository = {
  create: async function (question: Question): Promise<void> { },
}

test('Create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova pergunta",
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy()
  expect(question.slug.value).toEqual('nova-pergunta')
})
