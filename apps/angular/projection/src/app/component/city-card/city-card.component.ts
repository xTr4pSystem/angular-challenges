import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [itemTemplate]="item"
    (add)="onAddCity()">
    <ng-template #item let-city>
      <app-list-item
        [name]="city.name"
        (delete)="onRemovedCity(city.id)"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      app-card {
        --card-background: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  http = inject(FakeHttpService);
  store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  onAddCity(): void {
    this.store.addOne(randomCity());
  }

  onRemovedCity(studentId: number): void {
    this.store.deleteOne(studentId);
  }
}
