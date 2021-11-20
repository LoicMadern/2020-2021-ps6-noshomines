import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-question-play',
  templateUrl: './question-play.component.html',
  styleUrls: ['./question-play.component.scss']
})

export class QuestionPlayComponent implements OnInit {

  selectedAnswer?: Answer;

  @Input()
  question: Question;

  @Input()
  listIndexAnswerFalse: Array<number>;

  @Output()
  indexAnswerChecked: EventEmitter<number> = new EventEmitter<number>();

  public questionPlayForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.questionPlayForm = this.formBuilder.group({
      indexAnswer: 0,
    });
  }

  ngOnInit(): void {
  }


  onSelect(answer: Answer, indexAnswer: number): void {
    this.selectedAnswer = answer;
    this.indexAnswerChecked.emit(indexAnswer);
  }


}
