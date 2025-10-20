import { CommonModule } from '@angular/common';
import { Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  protected searchQuery = signal('');
  onInput = output<string>();

  constructor() {
    effect(() => {
      this.onInput.emit(this.searchQuery());
    })
  }

}
