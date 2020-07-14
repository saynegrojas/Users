import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IUser } from '../users/user';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  pageTitle = 'Details';
  public userId;
  public user;
  errorMsg: string;
  users: IUser;




  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // hard coded because using .json file for database
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.users = {
      "UserId": id,
      "FirstName": "glen",
      "LastName": "Grayson",
      "Email": "GG@gmail.com",
      "Password": "glen"
    }

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   // console.log(params.get('id'))
    //   let id = params.get('id');
    //   this.pageTitle += `: ${id}`;
    //   console.log(id)
    //   this.userId = id;
    //   console.log(this.userId);
    // });
    // this.userService.getUsersById(this.userId).subscribe({
    //   next: users => {
    //     this.user = users;
    //     console.log(this.user)
    //   },
    // this.usersById[this.userId]
    // this.first = this.usersById[this.userId].FirstName;
    // console.log(this.first)
    //   error: err => this.errorMsg = err
    // });

  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(['/users'])
  }
}