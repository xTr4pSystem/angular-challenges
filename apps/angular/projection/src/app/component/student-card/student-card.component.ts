import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    [itemTemplate]="item"
    (add)="onAddStudent()">
    <img cardImage src="assets/img/student.webp" width="200px" />
    <ng-template #item let-student>
      <app-list-item
        [name]="student.firstname"
        (delete)="onRemovedStudent(student.id)"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      app-card {
        --card-background: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onAddStudent(): void {
    this.store.addOne(randStudent());
  }

  onRemovedStudent(studentId: number): void {
    this.store.deleteOne(studentId);
  }
}
