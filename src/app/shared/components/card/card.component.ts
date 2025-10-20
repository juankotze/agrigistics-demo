import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() width: string = '100%';
  @Input() height: string = '100%';

  @Input() maxWidth: string = '';

  @ContentChild('cardHeader') headerTemplate?: TemplateRef<any>;
  @ContentChild('cardContent') contentTemplate?: TemplateRef<any>;
  @ContentChild('cardFooter') footerTemplate?: TemplateRef<any>;

  hasHeader(): boolean {
    return !!this.headerTemplate;
  }
}
