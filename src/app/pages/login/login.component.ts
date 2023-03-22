import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  }

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log('login btn clicked');


    //ak nezadá username, vyskočí upozornenie
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required !', '', {
        duration: 3000,
      });
      return;
    }

    //ak nezadá heslo, vyskočí upozornenie
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required !  ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server pre generovanie tokena
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //redirect ...ADMIN: admin-dashboard
            //redirect ...TEACHER: teacher-dashboard
            //redirect ...STUDENT: student-dashboard
            if (this.login.getUserRole() == 'ADMIN') {
              //admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
            } else if (this.login.getUserRole() == 'TEACHER') {
              //teacher dashboard
              // window.location.href = '/teacher';
              this.router.navigate(['teacher']);
            } else if (this.login.getUserRole() == 'STUDENT') {
              //student dashboard
              // window.location.href = '/student';
              this.router.navigate(['student']);
            } else {
              this.login.logout();
            }
          });
      },



      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid username or password. Try again', '', {
          duration: 3000,
        });
      }
    );


  }
}
