import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { CardComponent, SearchBoxComponent } from "../../../shared";
import * as L from 'leaflet';

@Component({
  selector: 'geoclock-map',
  imports: [CardComponent, SearchBoxComponent],
  templateUrl: './geoclock-map.component.html',
  styleUrl: './geoclock-map.component.scss'
})
export class GeoclockMapComponent implements AfterViewInit {

  mapContainer = viewChild<ElementRef>('mapContainer');

  searchQuery = signal('');


  ngAfterViewInit(): void {
    // Initialize the map here using the mapContainer reference
    if (this.mapContainer()?.nativeElement) {
      const map = L.map(this.mapContainer()?.nativeElement).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }
  }
}
