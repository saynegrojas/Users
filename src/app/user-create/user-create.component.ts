import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../users/user";
import { UserService } from "../users/user.service";
import { User } from "../users/usersModel";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  pageTitle = "Create a new user";
  users: IUser[];
  errorMessage: string;

  constructor(private router: Router, private userService: UserService) { }
  public userModel = new User();

  ngOnInit() { }

  //on submit
  onSubmit(userForm) {
    console.log(userForm);
    this.userService.postUser(this.userModel).subscribe(
      (data) => (this.users = data),
      (error) => (this.errorMessage = error)
    );
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/users"]);
  }
}
