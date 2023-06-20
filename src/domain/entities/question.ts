import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entity/entity";
import { UniqueEntityId } from "../../core/entity/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface IQuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  content: string
  slug: Slug
  title: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<IQuestionProps> {
  static create(props: Optional<IQuestionProps, 'createdAt'>, id?: UniqueEntityId) {
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id)

    return question
  }
}