import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IQuestionProps, Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<IQuestionProps> = {}
) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: "Example question",
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override
  })

  return question
}