import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { CredentialsDTO } from 'app/models/credenciais.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  creds: CredentialsDTO = {
    usuario: '',
    senha: ''
};
formGroup: FormGroup;
  constructor(private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        usuario: ['Fabio Silva de Albuquerque', [Validators.required]],
        senha: ['fabiosalbuquerque', [Validators.required]],
     });
    }

  ngOnInit(): void {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        },
        error => {
         });
  }

  login() {
    this.creds = this.formGroup.value;
    console.log(this.creds);
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
    },
    error => {
     });
   }

}
