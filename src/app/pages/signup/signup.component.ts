import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {


  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }
  //do konštruktora idú triedy ktoré som použila, či už zo Springu alebo angular

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void { }

  formSubmit() {
    /* alert('submit'); */
    /* toto je správa ktorá sa nám zobrazí ked stlačíme tlačidlo s popisom formSubmit */

    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      //alert('User is required.')
      /* this._snackBar.open('Username is required.', 'OK', {
        duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['green-snackbar'],
      }); */
      Swal.fire({title: 'Warning', text: 'Username is required', icon: 'warning', confirmButtonColor: '#2821f3'});
      return;
    }

    //validate


    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        console.log(data);
        //alert('success');
        /* this._snackBar.open('Success.', '', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top',
        }); */
        Swal.fire('Success', 'User id is ' + data.id, 'success');
      },
      (error) => {
        //errorr
        console.log(error);
        //alert('something went wrong');
        /* this._snackBar.open('Something went wrong.', 'Accept', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['green-snackbar']
        }); */
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    );




  }


  //this.user



}
