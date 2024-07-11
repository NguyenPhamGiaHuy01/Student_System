import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);
  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    age: [''],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  userService = inject(UserService)
  router = inject(Router)
  route = inject(ActivatedRoute) // Lấy id
  editUserId!: string
  ngOnInit(){
    this.editUserId = this.route.snapshot.params['id']
   if (this.editUserId) {
    this.userService.getUser(this.editUserId).subscribe((result)=>{
      this.userForm.patchValue(result)
    })
   }
  }
  addUsers()
  {
    if (this.userForm.invalid) {
      alert('Please provide all field with valid data')
      return
    }
    else{
      const model:User = this.userForm.value
      this.userService.addUser(model).subscribe(()=>{
        alert('User added successfully!');
        this.router.navigateByUrl('/');
      })
    }
   
  }


  UpdateUser(){
    if (this.userForm.invalid) {
      alert('Please provide all field with valid data')
      return
    }
    else{
      const model:User = this.userForm.value
      this.userService.editUser(this.editUserId,model).subscribe(()=>{
        alert('User added successfully!');
        this.router.navigateByUrl('/');
      })
    }
  }
}


