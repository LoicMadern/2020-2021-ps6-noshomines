import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  private quizForm: FormGroup;
  private isOneQuestionQuiz: boolean;
  private isOneQuestionImage: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });
    this.isOneQuestionImage = false;
    this.isOneQuestionQuiz = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  intializeQuiz(): void {
    this.quizForm = this.formBuilder.group({
      id: this.quiz.id,
      name: this.quiz.name,
      theme: this.quiz.theme,
      isPictureQuiz: this.quiz.isPictureQuiz,
    });
  }

  validateQuiz(): void {
    this.quizService.retrieveQuizzes(false);
    this.intializeQuiz();

    this.quiz.questions.forEach(item => {
      if (item.isPictureAnswer){
        this.isOneQuestionImage = true;
      }
      else {
        this.isOneQuestionQuiz = true;
      }
    });

    if (this.isOneQuestionQuiz && this.isOneQuestionImage){
      this.quizForm.patchValue({isPictureQuiz: 'mixte'});
    }
    else if (this.isOneQuestionImage){
      this.quizForm.patchValue({isPictureQuiz: 'image'});
    }
    else {
      this.quizForm.patchValue({isPictureQuiz: 'text'});
    }

    const quizToModify: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(this.quizForm.value);
    this.quizService.modifyUser(quizToModify);
    this.router.navigate(['/gestion-quiz']);
  }
}
