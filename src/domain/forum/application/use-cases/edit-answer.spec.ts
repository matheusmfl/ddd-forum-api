import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/repositories/factories/make-answer"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { EditAnswerUseCase } from "./edit-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({

      authorId: 'author1',
      content: 'Conteúdo teste',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste'
    })
  })

  it('Should not be able to delete a answer from another author', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author1')
    }, new UniqueEntityId('Answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() =>
      sut.execute({
        authorId: 'author2',
        content: 'Conteúdo teste',
        answerId: newAnswer.id.toValue(),
      })).rejects.toBeInstanceOf(Error)


  })
})