import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"

import { makeAnswer } from "test/repositories/factories/make-answer"
import { DeleteAnswerUseCase } from "./delete-answer"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'Answer-1',
      authorId: 'author1'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a answer from another author', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() =>
      sut.execute({
        answerId: 'Answer-1',
        authorId: 'author2'
      })).rejects.toBeInstanceOf(Error)


  })
})