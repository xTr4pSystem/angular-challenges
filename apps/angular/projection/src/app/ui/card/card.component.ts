import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  styles: [
    `
      $cardBackground: var(--card-background, #04afafaf);

      .card {
        background-color: $cardBackground;
      }
    `,
  ],
})
export class CardComponent {
  @Input({ required: true }) list!: any[];
  @Input({ required: true }) itemTemplate!: TemplateRef<any>;
  @Output() add = new EventEmitter<void>();
}
