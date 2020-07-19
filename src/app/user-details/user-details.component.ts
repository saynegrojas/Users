import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { IUser } from "../users/user";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  pageTitle = "details";
  public userId;
  public user;
  errorMsg: string;
  users: IUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('id'))
      let id = params.get("id");
      // this.pageTitle += `: ${id}`;
      // console.log(id);
      this.userId = id;
      // console.log(this.userId);
    });
    this.userService.getUsersById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
      },
      error: (err) => (this.errorMsg = err),
    });
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/users"]);
  }
}
