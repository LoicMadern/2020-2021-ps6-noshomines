import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public questionForm: FormGroup;
  public isPictureAnswer: boolean;
  public numberGoodAnswer: number;
  public notValidLabel: boolean;
  public notValidValues: boolean;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();

    console.log(this.questionForm);

    this.questionForm.get('label').valueChanges.subscribe(value => {
      this.notValidLabel = value === null || value === '';
    });

    this.questionForm.get('answers').valueChanges.subscribe(value => {
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        console.log(value[i].value);
        if (value[i].value === null || value[i].value === ''){
          this.notValidValues = true;
          break;
        }
        this.notValidValues = false;
      }
    });
  }

  private initializeQuestionForm(): void {
    this.isPictureAnswer = false;
    this.notValidLabel = true;
    this.notValidValues = true;
    this.numberGoodAnswer = 0;

    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([]),
      isPictureAnswer: false,
    });
  }

  ngOnInit(): void {
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  addQuestion(): void {

    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      console.log(question.answers.length);

      this.quizService.addQuestion(this.quiz, question);
      console.log(this.questionForm.value);
      this.initializeQuestionForm();

    }
  }

  onSelect(): void {
    this.isPictureAnswer = !this.isPictureAnswer;
    console.log('isPictureAnswer : ' + this.isPictureAnswer);
  }

  countGoodAnswer(j: number): void {

    setTimeout(() => {
      const question = this.questionForm.getRawValue() as Question;
      if (j !== -1) {
        this.numberGoodAnswer = 0;
        question.answers.forEach(item => {
          if (item.isCorrect) {
            this.numberGoodAnswer += 1;
          }
        });
      }
    });
  }

}
