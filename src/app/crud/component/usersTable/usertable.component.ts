import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PdfService } from '../../../shared/services/pdf.service';

@Component({
  selector: 'app-usertable',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.scss',
})
export class UsertableComponent {
  userList$!: Observable<User[]>;
  loading$!: Observable<boolean>;

  userService = inject(UserService);
  dataService = inject(DataService);
  pdfService = inject(PdfService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  isPdfGenerated = false;

  ngOnInit(): void {
    this.userService.getUsers();
    this.getAllUsers();
    this.loading$ = this.userService.loadingObservable$;
  }

  getAllUsers() {
    this.userList$ = this.userService.usersListObservable$;
  }

  onEdit(user: User) {
    this.dataService.updateUser(user);
    this.router.navigate(['edit-user', user.id], {
      relativeTo: this.route.parent,
    });
  }

  onDelete(id: string | undefined) {
    id && this.userService.deleteUser(+id);
  }

  generatePdf() {
    this.pdfService.generatePdf().subscribe({
      next: (res) => {
        this.isPdfGenerated = !!res.path;
      },
      error: () => {
        this.isPdfGenerated = false;
      },
    });
  }

  downloadPdf(): void {
    this.pdfService.retrievePdf().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
