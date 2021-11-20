import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-option-quiz',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public PATHOLOGY_LIST: string[] = ['aucune pathologie', 'Alzheimer stade 1: aucun trouble', 'Alzheimer stade 2 : déficit cognitif très léger', 'Alzheimer stade 3 : déficit cognitif léger', 'Alzheimer stade 4 : déficit cognitif modéré', 'Alzheimer stade 5 et + : déficit cognitif sévère'];
  public LIMIT_QUESTION_PLAY_LIST: string[] = ['5', '10', '15', '20', '25', '30'];

  public userForm: FormGroup;
  public firstName: string;
  public lastName: string;
  public pathology: string;
  public restartQuestionOption: boolean;
  public answerDisplayOption: boolean;
  public displayScoreOption: boolean;
  public pictureQuizOption: boolean;
  public numberOfQuestionsMaxForPlayQuizOption: string;


  constructor(private router: Router, public formBuilder: FormBuilder, public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.pathology = user.pathology;
      this.restartQuestionOption = user.restartQuestionOption;
      this.answerDisplayOption = user.answerDisplayOption;
      this.displayScoreOption = user.displayScoreOption;
      this.pictureQuizOption = user.pictureQuizOption;
      this.numberOfQuestionsMaxForPlayQuizOption = user.numberOfQuestionsMaxForPlayQuizOption;
      this.user = user;

      this.userForm = this.formBuilder.group({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        comment: user.comment,
        pathology: user.pathology,
        restartQuestionOption: user.restartQuestionOption,
        answerDisplayOption: user.answerDisplayOption,
        displayScoreOption: user.displayScoreOption,
        pictureQuizOption: user.pictureQuizOption,
        numberOfQuestionsMaxForPlayQuizOption: user.numberOfQuestionsMaxForPlayQuizOption,
      });
    });
  }

  ngOnInit(): void {
  }

  validate(): void {
    const userToModify: User = this.userForm.getRawValue() as User;
    this.userService.modifyUser(userToModify);
    console.log(this.userForm.value);
    this.userService.setSelectedUser(userToModify.id);
    this.router.navigate(['/user-list']);
  }

  onSelectRestartQuestionOption(): void {
    this.restartQuestionOption = !this.restartQuestionOption;
    console.log('restartQuestionOption : ' + this.restartQuestionOption);
  }

  onSelectAnswerDisplayOption(): void {
    this.answerDisplayOption = !this.answerDisplayOption;
    console.log('answerDisplayOption : ' + this.answerDisplayOption);
  }

  onSelectDisplayScoreOption(): void {
    this.displayScoreOption = !this.displayScoreOption;
    console.log('displayScoreOption : ' + this.displayScoreOption);
  }

  onSelectPictureQuizOption(): void {
    this.pictureQuizOption = !this.pictureQuizOption;
    console.log('pictureQuizOption : ' + this.pictureQuizOption);
  }

  setPathologyOption(pathology: Event): void {
    console.log('test');
    this.pathology = (pathology.target as HTMLTextAreaElement).value;
    console.log(this.pathology);
    console.log(this.PATHOLOGY_LIST[4]);
    switch (this.pathology){
      case this.PATHOLOGY_LIST[0]:
        this.pictureQuizOption = false;
        this.answerDisplayOption = false;
        this.displayScoreOption = true;
        this.restartQuestionOption = false;
        this.numberOfQuestionsMaxForPlayQuizOption = '30';
        this.userForm.patchValue({pictureQuizOption: false});
        this.userForm.patchValue({answerDisplayOption: false});
        this.userForm.patchValue({displayScoreOption: true});
        this.userForm.patchValue({restartQuestionOption: false});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '30'});
        console.log(this.PATHOLOGY_LIST[0]);
        break;
      case this.PATHOLOGY_LIST[1]:
        this.pictureQuizOption = false;
        this.answerDisplayOption = false;
        this.displayScoreOption = true;
        this.restartQuestionOption = false;
        this.numberOfQuestionsMaxForPlayQuizOption = '20';
        this.userForm.patchValue({pictureQuizOption: false});
        this.userForm.patchValue({answerDisplayOption: false});
        this.userForm.patchValue({displayScoreOption: true});
        this.userForm.patchValue({restartQuestionOption: false});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '20'});
        console.log(this.PATHOLOGY_LIST[1]);
        break;
      case this.PATHOLOGY_LIST[2]:
        this.answerDisplayOption = true;
        this.displayScoreOption = true;
        this.restartQuestionOption = false;
        this.pictureQuizOption = false;
        this.numberOfQuestionsMaxForPlayQuizOption = '15';
        this.userForm.patchValue({pictureQuizOption: false});
        this.userForm.patchValue({answerDisplayOption: true});
        this.userForm.patchValue({displayScoreOption: true});
        this.userForm.patchValue({restartQuestionOption: false});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '15'});
        console.log(this.PATHOLOGY_LIST[2]);
        break;
      case this.PATHOLOGY_LIST[3]:
        this.answerDisplayOption = true;
        this.displayScoreOption = false;
        this.restartQuestionOption = false;
        this.pictureQuizOption = false;
        this.numberOfQuestionsMaxForPlayQuizOption = '15';
        this.userForm.patchValue({pictureQuizOption: false});
        this.userForm.patchValue({answerDisplayOption: true});
        this.userForm.patchValue({displayScoreOption: false});
        this.userForm.patchValue({restartQuestionOption: false});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '15'});
        console.log(this.PATHOLOGY_LIST[3]);
        break;
      case this.PATHOLOGY_LIST[4]:
        this.answerDisplayOption = true;
        this.displayScoreOption = false;
        this.restartQuestionOption = true;
        this.pictureQuizOption = true;
        this.numberOfQuestionsMaxForPlayQuizOption = '10';
        this.userForm.patchValue({pictureQuizOption: true});
        this.userForm.patchValue({answerDisplayOption: true});
        this.userForm.patchValue({displayScoreOption: false});
        this.userForm.patchValue({restartQuestionOption: true});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '10'});
        console.log(this.PATHOLOGY_LIST[4]);
        break;
      case this.PATHOLOGY_LIST[5]:
        this.answerDisplayOption = true;
        this.displayScoreOption = false;
        this.restartQuestionOption = true;
        this.pictureQuizOption = true;
        this.numberOfQuestionsMaxForPlayQuizOption = '5';
        this.userForm.patchValue({pictureQuizOption: true});
        this.userForm.patchValue({answerDisplayOption: true});
        this.userForm.patchValue({displayScoreOption: false});
        this.userForm.patchValue({restartQuestionOption: true});
        this.userForm.patchValue({numberOfQuestionsMaxForPlayQuizOption: '5'});
        console.log(this.PATHOLOGY_LIST[5]);
        break;
      default:
        console.log('break');
        break;
    }
  }
}
