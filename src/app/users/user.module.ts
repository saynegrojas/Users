//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//components
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
//pipe (will eventually use in root)
import { CapFirstLetterPipe } from '../shared/CapFIrstLetter.pipe';

//providers
import { UserService } from './user.service';



@NgModule({
  declarations: [
    UsersComponent,
    // UserListComponent
    UserDetailsComponent,
    UserCreateComponent,
    UserEditComponent,
    CapFirstLetterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'users', component: UsersComponent },
      { path: 'users/details/:id', component: UserDetailsComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/edit/:id', component: UserEditComponent }

    ])
  ],
  providers: [UserService]
})
export class UserModule { }
