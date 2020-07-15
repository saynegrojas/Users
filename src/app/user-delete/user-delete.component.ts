import { Component, OnInit } from "@angular/core";
import { ParamMap, Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-user-delete",
  templateUrl: "./user-delete.component.html",
  styleUrls: ["./user-delete.component.css"],
})
export class UserDeleteComponent implements OnInit {
  public userId;
  // users: IUser[];
  errorMessage: string;
  public user;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

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
  //delete
  deleteUser(user) {
    this.userService.deleteUser(user.UserID).subscribe(() => {
      this.userService.getUsers().subscribe(
        (data) => (this.user = data),
        (error) => (this.errorMessage = error)
      );
      this.router.navigate(["/users"]);
    });
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/users"]);
  }
}
