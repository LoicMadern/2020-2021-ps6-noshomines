import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteUser.emit(this.user);
  }

  selectUser(): void {
    this.userSelected.emit(this.user);
  }

  modifyUser(user: User): void {
    this.userService.setSelectedUser(user.id);
    this.router.navigate(['/user-edit']);
  }

}
