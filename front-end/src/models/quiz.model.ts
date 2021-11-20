import { Question } from './question.model';

export interface Quiz {
  id: string;
  name: string;
  theme?: string;
  isPictureQuiz: string;
  questions: Question[];
}
