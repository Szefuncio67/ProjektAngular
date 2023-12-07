import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    nazwa: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    haslo: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get nazwa() {
    return this.registerForm.controls['nazwa'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get haslo() {
    return this.registerForm.controls['haslo'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    const email = postData.email;
    delete postData.confirmPassword;
    this.authService.getUserByEmail(email as string).subscribe(
      response =>{if (!(response.length > 0)){
        this.authService.registerUser(postData as User).subscribe(
          response => {
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
            this.router.navigate(['login'])
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
          }
        )
      }else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'email is taked' });
      }
    }
    )
      
    }
  

}
