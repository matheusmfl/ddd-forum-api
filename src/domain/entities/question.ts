import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entity/entity";

interface IQuestionProps {
  authorId: string
  content: string
  slug: Slug
  title: string
}

export class Question extends Entity<IQuestionProps> {
}