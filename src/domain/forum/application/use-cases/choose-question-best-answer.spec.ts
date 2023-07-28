import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/repositories/factories/make-answer"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { makeQuestion } from "test/repositories/factories/make-question"


let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
  })

  it('Should be able to choose the question best answer', async () => {

    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('Should not be able to chooser another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)

    await inMemoryAnswersRepository.create(answer)

    expect(() =>
      sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author2'
      })).rejects.toBeInstanceOf(Error)


  })
})