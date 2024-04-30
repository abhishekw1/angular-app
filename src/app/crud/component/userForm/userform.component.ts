import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss',
})
export class UserformComponent implements OnInit {
  userService = inject(UserService);
  dataService = inject(DataService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  loading$!: Observable<boolean>;

  isEdit = false;

  userForm = this.formBuilder.nonNullable.group({
    id: '',
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', Validators.required],
  });

  get name() {
    return this.userForm.controls?.['name'];
  }
  get email() {
    return this.userForm.controls?.['email'];
  }
  get phone() {
    return this.userForm.controls?.['phone'];
  }
  get address() {
    return this.userForm.controls?.['address'];
  }

  ngOnInit(): void {
    this.dataService.userObservable.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
        this.isEdit = true;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });

    this.loading$ = this.userService.loadingObservable$;
  }

  addandUpdateUser() {
    if (this.userForm.valid) {
      if (this.userForm.value.id) {
        this.userService
          .updateUser(this.userForm.getRawValue())
          .subscribe((value) => {
            this.userForm.reset();
            this.dataService.removeUser();
            this.isEdit = false;
            this.router.navigate(['/crud']);
          });
      } else {
        this.userService
          .addUser(this.userForm.getRawValue())
          .subscribe((value) => {
            this.userForm.reset();
            this.router.navigate(['/crud']);
          });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onClear() {
    this.userForm.reset();
    this.isEdit = false;
  }
}
