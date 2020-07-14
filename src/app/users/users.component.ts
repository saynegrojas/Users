import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './user';
import { filter } from 'minimatch';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  errorMessage: string;
  dataFromChild: string;
  userId: number;
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
    this.filterUsers = this.listFilter ? this.filterOut(this.listFilter) : this.users;
  }


  // users: IUser[] = [
  //   {
  //     "UserId": 1,
  //     "FirstName": "John",
  //     "LastName": "Smith",
  //     "Email": "JS@gmail.com",
  //     "Password": "john"
  //   },
  //   {
  //     "UserId": 2,
  //     "FirstName": "Joe",
  //     "LastName": "Allen",
  //     "Email": "JA@gmail.com",
  //     "Password": "joe"
  //   }
  // ]

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.filterUsers = this.users;
        console.log(this.filterUsers);
      },
      error: err => this.errorMessage = err
    });
  }
  // handleNotify(eventData) {
  //   this.dataFromChild = eventData;
  // }
  filterOut(filterBy: string): IUser[] {
    //lowercase the value for comporision 
    filterBy = filterBy.toLocaleLowerCase();
    //JS filter method creates a new array with elements that pass the test defined in the function
    return this.users.filter((user: IUser) => user.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  goDetails(users) {
    console.log(users.UserId)
    this.router.navigate(['/users/details/', users.UserId]);
  }
  // isSelected(user) {
  //   console.log(user);
  //   user.UserId = this.selectedId;
  // }
  goCreate() {
    // this.userId ? this.userId : null;
    this.router.navigate(['/users/create']);
    // this.router.navigate(['/users/create', { id: this.userId }], { relativeTo: this.route });
    console.log('create');
  }
  goEdit(user) {
    this.router.navigate(['/users/edit', user.UserId])
    console.log('edit');
  }
}

