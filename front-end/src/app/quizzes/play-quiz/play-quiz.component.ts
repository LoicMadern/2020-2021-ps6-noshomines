import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {max} from 'rxjs/operators';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public user: User;

  public isCorrect: boolean;
  public printDisplay: boolean;
  public indexQuestion: number;
  public indexAnswer: number;
  public listIndexAnswerFalse: Array<number>;
  public score: number;
  public numberOfQuestions: number;


  constructor(private route: ActivatedRoute, private quizService: QuizService, public userService: UserService) {

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = this.copieQuiz(quiz);
      this.quiz = this.shuffle(this.quiz);
      if (this.quiz && this.user ){
        if ( parseInt(this.user.numberOfQuestionsMaxForPlayQuizOption, 10) > this.quiz.questions.length){
          this.numberOfQuestions = this.quiz.questions.length;
        }
        else{
          this.numberOfQuestions = parseInt(this.user.numberOfQuestionsMaxForPlayQuizOption, 10);
        }
      }

    });
    this.indexQuestion = 0;
    this.score = 0;
    this.printDisplay = false;
    this.listIndexAnswerFalse = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }


  answerSelected(indexAnswer: number): void {
    console.log('playquiz : restartQuestionOption : ' + this.user.restartQuestionOption);
    console.log('playquiz : answerDisplayOption : ' + this.user.answerDisplayOption);
    console.log('playquiz : displayScoreOption : ' + this.user.displayScoreOption);
    this.indexAnswer = indexAnswer;
    this.isCorrect = this.getIsCorrect();
  }

  getIsCorrect(): boolean{
    return this.quiz.questions[this.indexQuestion].answers[this.indexAnswer].isCorrect;
  }

  validateQuestion(): void {
    if (!this.user.restartQuestionOption) {
      this.printDisplay = true;
      if (this.getIsCorrect()) {
        this.score++;
      }
    }
    else {
      if (this.getIsCorrect()) {
        this.printDisplay = true;
        this.score++;
      }
      else {
        this.listIndexAnswerFalse.push(this.indexAnswer);
      }
    }
    if (!this.user.answerDisplayOption) {
      if (this.user.restartQuestionOption && this.getIsCorrect()){
        this.nextQuestion();
      }
      else if (!this.user.restartQuestionOption){
        this.nextQuestion();
      }
    }else {
      console.log('score : ' + this.score);
      console.log('index de la question : ' + this.indexQuestion);
    }
  }

  nextQuestion(): void {
    this.indexQuestion++;
    this.printDisplay = false;
    this.indexAnswer = null;
    this.listIndexAnswerFalse = [];
  }

  restartQuiz(): void {
    this.shuffle(this.quiz);
    this.score = 0;
    this.indexQuestion = 0;
    this.listIndexAnswerFalse = [];
  }

  copieQuiz(quiz: Quiz): Quiz {
    const copy = JSON.parse(JSON.stringify(quiz));
    console.log(quiz.isPictureQuiz);
    console.log(this.user.answerDisplayOption);

    if (this.user.pictureQuizOption && quiz.isPictureQuiz === 'mixte'){
      console.log('ça rentre');
      copy.questions = [];
      console.log(quiz);
      console.log(copy);
      // tslint:disable-next-line:prefer-for-of
      for ( let k = 0; k < quiz.questions.length; k++){
        if (quiz.questions[k].isPictureAnswer){
          copy.questions.push(quiz.questions[k]);
        }
      }
    }

    return copy;
  }

  shuffle(quiz: Quiz): Quiz {
    let j = 0;
    let temp = quiz.questions[0];
    let i = quiz.questions.length - 1  ;
    for (; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = quiz.questions[i];
      quiz.questions[i] = quiz.questions[j];
      quiz.questions[j] = temp;
    }
    return quiz;
  }
}
