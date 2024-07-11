import { Component, OnInit, inject } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent{
  users: User[]=[];
  userService=inject(UserService)
  ngOnInit(){
    this.userService.getUsers().subscribe(result=>{
      this.users = result
      console.log(this.users)
    })
  }

  deleteUser(id: string){
    const ok = confirm("Are you sure want to delete user")
    if (ok) {
        this.userService.deleteUser(id).subscribe((result)=>{
          alert("Delete user successs")
          this.users = this.users.filter((u)=>u._id != id)
        })
    }
  }
}
