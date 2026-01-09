import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm:FormGroup;
constructor(private router: Router,private fb: FormBuilder, private AuthService:AuthService) {
  this.loginForm=fb.group({
    userName:['',[Validators.required]],
    Password:['',[Validators.required]]
  });
}
onSubmit(){
  if (this.loginForm.invalid) {
      // this.loginForm.markAllAsTouched();
      return;
    }
    
    // this.isLoading.set(true);
    // this.errorMessage.set(null);
    
    this.AuthService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // this.isLoading.set(false);
        
        // Check for stored redirect URL
        const redirectUrl = localStorage.getItem('redirectUrl') || '/admin';
        localStorage.removeItem('redirectUrl');
        
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        // this.isLoading.set(false);
        // this.errorMessage.set(
        //   error.error?.message || 'Login failed. Please check your credentials.'
        // );
      }
    });
}
  isForgot(){
    return this.router.url==='/forgot_pass';
  }
  navigate(){
    this.router.navigate(['/forgot_pass']);
  }
}
