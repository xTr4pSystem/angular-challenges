import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    [itemTemplate]="item"
    (add)="onAddTeacher()">
    <img cardImage src="assets/img/teacher.png" width="200px" />
    <ng-template #item let-teacher>
      <app-list-item
        [name]="teacher.firstname"
        (delete)="onRemovedTeacher(teacher.id)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      app-card {
        --card-background: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  onAddTeacher(): void {
    this.store.addOne(randTeacher());
  }

  onRemovedTeacher(teacherId: number): void {
    this.store.deleteOne(teacherId);
  }
}
