import { Entity } from "../../core/entity/entity";

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {
}