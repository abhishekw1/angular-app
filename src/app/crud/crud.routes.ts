import { Routes } from '@angular/router';
import { UserformComponent } from './component/userForm/userform.component';
import { UsertableComponent } from './component/usersTable/usertable.component';
import { CrudComponent } from './crud.component';

export const crudRoutes: Routes = [
  {
    path: '',
    component: CrudComponent,
    children: [
      {
        path: '',
        component: UsertableComponent,
      },
      {
        path: 'new-user',
        component: UserformComponent,
      },
      {
        path: 'edit-user/:id',
        component: UserformComponent,
      },
    ],
  },
];
