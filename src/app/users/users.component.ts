import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { IUser } from "./user";
import { filter } from "minimatch";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  errorMessage: string;
  dataFromChild: string;
  // public userId;
  filterUsers: IUser[];
  users: IUser[] = [];

  //getter and setter
  _listFilter: string;
  //calls getter when data binding needs a value
  get listFilter(): string {
    //return a string after getting a value
    return this._listFilter;
  }
  //data binding calls setter when user modifies the value, passing in the changed value
  set listFilter(value: string) {
    this._listFilter = value;
    //set to filterUsers
    //condition if true, filter function passing in listFilter value
    //if false, assign entire set of users
    this.filterUsers = this.listFilter
      ? this.filterOut(this.listFilter)
      : this.users;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filterUsers = this.users;
        console.log(this.filterUsers);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  filterOut(filterBy: string): IUser[] {
    //lowercase the value for comporision
    filterBy = filterBy.toLocaleLowerCase();
    //JS filter method creates a new array with elements that pass the test defined in the function
    return this.users.filter(
      (user: IUser) =>
        user.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  //route to details component
  goDetails(user) {
    console.log(user);
    console.log(user.UserID);
    this.router.navigate(["/users/details/", user.UserID]);
  }

  //route to create component
  goCreate() {
    // this.userId ? this.userId : null;
    this.router.navigate(["/users/create"]);
    // this.router.navigate(['/users/create', { id: this.userId }], { relativeTo: this.route });
    console.log("create");
  }

  //route to edit component
  goEdit(user) {
    console.log("edit");
    this.router.navigate(["/users/edit/", user.UserID]);
  }

  //back to users
  goDelete(user) {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/users/delete/", user.UserID]);
  }
}
