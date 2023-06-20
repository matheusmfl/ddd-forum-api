import { Entity } from "../../core/entity/entity";

interface IAnswerProps {
  content: string
  authorId: string
  questionId: string
}

export class Answer extends Entity<IAnswerProps> {
  get content() {
    return this.props.content
  }
}