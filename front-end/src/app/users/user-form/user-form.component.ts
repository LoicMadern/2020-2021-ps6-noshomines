import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  public PATHOLOGY_LIST: string[] = ['aucune pathologie', 'Alzheimer stade 1: aucun trouble', 'Alzheimer stade 2 : déficit cognitif très léger', 'Alzheimer stade 3 : déficit cognitif léger', 'Alzheimer stade 4 : déficit cognitif modéré ', 'Alzheimer stade 5 et + : déficit cognitif sévère'];
  public notValidName: boolean;
  public notValidFirstName: boolean;
  public notValidPathology: boolean;
  public notValidComment: boolean;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.notValidName = true;
    this.notValidFirstName = true;
    this.notValidPathology = true;
    this.notValidComment = true;

    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      comment: [''],
      pathology: [''],
      restartQuestionOption: false,
      displayScoreOption: true,
      answerDisplayOption: false,
      pictureQuizOption: false,
      numberOfQuestionsMaxForPlayQuizOption: '0',
    });


    this.userForm.get('lastName').valueChanges.subscribe(value => {
      this.notValidName = value === null || value === '';
    });

    this.userForm.get('firstName').valueChanges.subscribe(value => {
      this.notValidFirstName = value === null || value === '';
    });

    this.userForm.get('comment').valueChanges.subscribe(value => {
      this.notValidComment = value === null || value === '';
    });

    this.userForm.get('pathology').valueChanges.subscribe(value => {
      this.notValidPathology = value === null || value === '';
    });
  }

  ngOnInit(): void {
  }

  addUser(): void {
    // We retrieve here the user object from the userForm and we cast the type "as User".
    const userToCreate: User = this.userForm.getRawValue() as User;
    this.setPathologyOption(userToCreate);
    console.log(this.userForm.value);
    console.log(userToCreate.pictureQuizOption);
    this.userService.addUser(userToCreate);
  }

  setPathologyOption(userCreate: User): void {
    switch (userCreate.pathology){
      case this.PATHOLOGY_LIST[0]:
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '30';
        break;
      case this.PATHOLOGY_LIST[1]:
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '20';
        break;
      case this.PATHOLOGY_LIST[2]:
        userCreate.answerDisplayOption = true;
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '15';
        break;
      case this.PATHOLOGY_LIST[3]:
        userCreate.answerDisplayOption = true;
        userCreate.displayScoreOption = false;
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '15';
        break;
      case this.PATHOLOGY_LIST[4]:
        userCreate.answerDisplayOption = true;
        userCreate.displayScoreOption = false;
        userCreate.restartQuestionOption = false;
        userCreate.pictureQuizOption = true;
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '10';
        break;
      case this.PATHOLOGY_LIST[5]:
        userCreate.answerDisplayOption = true;
        userCreate.displayScoreOption = false;
        userCreate.restartQuestionOption = true;
        userCreate.pictureQuizOption = true;
        userCreate.numberOfQuestionsMaxForPlayQuizOption = '5';
        break;
      default: break;
    }
  }
}
