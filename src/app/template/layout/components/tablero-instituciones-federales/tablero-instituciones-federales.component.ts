import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

export interface CardItem {
  icon: string;
  iconColor: string;
  titleTranslate: string;
  count: number;
  routerLink: string;
}

@Component({
  selector: 'app-tablero-instituciones-federales',
  templateUrl: './tablero-instituciones-federales.component.html',
  styleUrl: './tablero-instituciones-federales.component.scss',
})
export class TableroInstitucionesFederalesComponent {
  @Input() cardTitleTranslate!: string;
  @Input() cardSubtitleTranslate!: string;
  @Input() items: CardItem[] = [];
}
