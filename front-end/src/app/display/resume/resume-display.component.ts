import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from '../../../models/quiz.model';


@Component({
  selector: 'app-resume-display',
  templateUrl: './resume-display.component.html',
  styleUrls: ['./resume-display.component.scss']
})

export class ResumeDisplayComponent implements OnInit {


  @Input()
  quiz: Quiz;

  @Input()
  numberOfQuestions: number;

  @Input()
  displayScoreOption: boolean;

  @Input()
  score: number;


  constructor() {
  }

  ngOnInit(): void  {
  }

  findAnswer(indexQuestion: number): string {
    for (let i = 0; i < this.quiz.questions[indexQuestion].answers.length; i++) {
      if (this.quiz.questions[indexQuestion].answers[i].isCorrect){
        return this.quiz.questions[indexQuestion].answers[i].value;
      }
    }
    return 'Aucune réponse';
  }


}


