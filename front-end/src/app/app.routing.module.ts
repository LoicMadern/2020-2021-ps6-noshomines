import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';
import {GestionQuizComponent} from './quizzes/gestion-quiz/gestion-quiz.component';
import {UserEditComponent} from './users/user-option/user-edit.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';


const routes: Routes = [
    {path: 'quiz-form', component: QuizFormComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'create-user', component: UserFormComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'play-quiz/:id', component: PlayQuizComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'quiz-list/:id', component: QuizListComponent},
    {path: 'gestion-quiz', component: GestionQuizComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: '', redirectTo: '/user-list', pathMatch: 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
