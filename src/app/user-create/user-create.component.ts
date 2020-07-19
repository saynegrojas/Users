import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../users/user';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private router: Router) { }
  
  // public userModel = new IUser;
  ngOnInit() {
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(['/users'])
  }

}
