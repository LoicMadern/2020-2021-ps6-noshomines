import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';


@Component({
  selector: 'app-answer-display',
  templateUrl: './answer-display.component.html',
  styleUrls: ['./answer-display.component.scss']
})

export class AnswerDisplayComponent implements OnInit {


  @Input()
  isCorrect: boolean;

  @Input()
  question: Question;


  constructor() {
  }

  ngOnInit(): void  {
  }

  findAnswer(): string {
    for (let i = 0; i < this.question.answers.length; i++) {
      if (this.question.answers[i].isCorrect){
        return this.question.answers[i].value;
      }
    }
    return 'Aucune réponse';
  }


}


