import {Component, EventEmitter, OnInit, OnDestroy, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit, OnDestroy {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  public notValidName: boolean;
  public notValidTheme: boolean;

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.notValidName = true;
    this.notValidTheme = true;

    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      isPictureQuiz: 'text',
    });

    this.quizForm.get('name').valueChanges.subscribe(value => {
      this.notValidName = value === null || value === '';
    });

    this.quizForm.get('theme').valueChanges.subscribe(value => {
      this.notValidTheme = value === null || value === '';
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  addQuiz(): void {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(this.quizForm.value);
    this.quizService.addQuiz(quizToCreate);
  }
}
