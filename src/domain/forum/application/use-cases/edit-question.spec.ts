import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

import { makeQuestion } from "test/repositories/factories/make-question"

import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { EditQuestionUseCase } from "./edit-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({

      authorId: 'author1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste'
    })
  })

  it('Should not be able to delete a question from another author', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() =>
      sut.execute({
        authorId: 'author2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste',
        questionId: newQuestion.id.toValue(),
      })).rejects.toBeInstanceOf(Error)


  })
})