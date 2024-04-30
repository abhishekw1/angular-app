import { Component } from '@angular/core';
import { UserformComponent } from './component/userForm/userform.component';
import { UsertableComponent } from './component/usersTable/usertable.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    UserformComponent,
    UsertableComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})
export class CrudComponent {}
