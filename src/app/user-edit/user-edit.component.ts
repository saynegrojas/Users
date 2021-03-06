import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { IUser } from "../users/user";
import { User } from "../users/usersModel";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  public userId;
  // users: IUser[];
  errorMessage: string;
  public user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  public userModel = new User();

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.userId = id;
    });
    this.user = this.userService.getUsersById(this.userId).subscribe(
      (data) => {
        (this.user = data), console.log(this.user);
      },
      (error) => (this.errorMessage = error)
    );
  }

  update(userId, user) {
    console.log(userId, user);
    this.userService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => (this.errorMessage = error)
    );
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/users"]);
  }
}
