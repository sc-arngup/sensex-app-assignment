import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email='';
  password='';
  error='';
  constructor(private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }
  onSubmit(){
    this.auth.login(this.email,this.password).subscribe({
      next:(res)=>{
        this.auth.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error:()=>{
        this.error='Invalid credentials'
      }
    })
  }
}
