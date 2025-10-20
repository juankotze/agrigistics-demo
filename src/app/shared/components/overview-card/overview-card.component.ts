import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SpacedCurrencyPipe } from '../../pipes';

export interface IOverviewCardConfig {
  iconColor: string;
  iconBackgroundColor: string;
  icon: string;
}

export interface IOverviewCardItem extends Partial<IOverviewCardConfig> {
  label: string;
  value: string | number;
  icon: string;
}

@Component({
  selector: 'overview-card',
  standalone: true,
  imports: [CommonModule, SpacedCurrencyPipe],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss'
})
export class OverviewCardComponent {

  config = input<IOverviewCardConfig>();
  defaultConfig: IOverviewCardConfig = {
    iconColor: '#000000',
    iconBackgroundColor: '#f0f0f0',
    icon: 'info'
  }

  items = input.required<IOverviewCardItem[]>();

}
