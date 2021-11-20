import {Quiz} from './quiz.model';
import {User} from './user.model';

export interface Attempt {
  id: string;
  quiz: Quiz;
  user: User;
}
