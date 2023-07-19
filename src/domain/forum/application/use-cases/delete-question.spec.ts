import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

import { makeQuestion } from "test/repositories/factories/make-question"
import { DeleteQuestionUseCase } from "./delete-question"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'Question-1',
      authorId: 'author1'
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a question from another author', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() =>
      sut.execute({
        questionId: 'Question-1',
        authorId: 'author2'
      })).rejects.toBeInstanceOf(Error)


  })
})