import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { CardComponent, SearchBoxComponent } from "../../../shared";
import * as L from 'leaflet';
import { MAP_LAYERS } from '../../../../assets/map/map-layers';
import { ReportingStore } from '../../reporting.store';
import { IClockingResponse } from '../../../shared/models/clocking.type';

export class MapLocation {
  name: string;
  lat: number;
  lng: number;
  constructor(initial: { name: string; lat: number; lng: number }) {
    this.name = initial.name;
    this.lat = initial.lat;
    this.lng = initial.lng;
  }

  get latlngexpression(): L.LatLngExpression {
    return [this.lat, this.lng];
  }
}

@Component({
  selector: 'geoclock-map',
  imports: [CardComponent, SearchBoxComponent],
  templateUrl: './geoclock-map.component.html',
  styleUrl: './geoclock-map.component.scss'
})
export class GeoclockMapComponent implements OnInit, AfterViewInit {
  private readonly store = inject(ReportingStore);
  protected readonly mapLayers = MAP_LAYERS;
  mapContainer = viewChild<ElementRef>('mapContainer');

  searchQuery = signal('');
  private map?: L.Map;
  private markersLayer?: L.LayerGroup;

  constructor() {
    // React to clocking data changes and update markers
    effect(() => {
      const clockingData = this.store.clockingData();
      if (this.map && clockingData.length > 0) {
        this.plotClockingMarkers(clockingData);
      }
    });
  }

  ngOnInit(): void {
    this.store.loadClockingData();
  }

  ngAfterViewInit(): void {
    // Initialize the map here using the mapContainer reference
    const sites = {
      atlantis: new MapLocation({ name: 'Atlantis', lat: -33.5978403, lng: 18.4497668}),
      waterfront: new MapLocation({ name: 'Waterfront', lat: -33.9030, lng: 18.4232}),
      cityCenter: new MapLocation({ name: 'City Center', lat: -33.9258, lng: 18.4232})
    }

    if (this.mapContainer()?.nativeElement) {
      this.map = L.map(this.mapContainer()?.nativeElement).setView(sites.atlantis.latlngexpression, 16);
      this.mapLayers.Satellite.addTo(this.map);
      L.control.layers({
        'Street': this.mapLayers.Street,
        'Satellite': this.mapLayers.Satellite
      }).addTo(this.map);

      // Initialize markers layer
      this.markersLayer = L.layerGroup().addTo(this.map);
    }
  }

  private plotClockingMarkers(clockingData: IClockingResponse[]): void {
    if (!this.map || !this.markersLayer) return;

    // Clear existing markers
    this.markersLayer.clearLayers();

    // Filter clockings with valid locations
    const validClockings = clockingData.filter(c => c.clockLocation !== null);

    validClockings.forEach(clocking => {
      if (!clocking.clockLocation) return;

      // Determine marker color based on geofence status
      const color = this.getMarkerColor(clocking.geoFenceStatus);
      
      // Create circle marker with custom styling
      const marker = L.circleMarker(
        [clocking.clockLocation.lat, clocking.clockLocation.lon],
        {
          radius: 8,
          fillColor: color,
          color: clocking.isClockIn ? '#000' : '#666',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }
      );

      // Build popup content
      const popupContent = this.buildPopupContent(clocking);
      marker.bindPopup(popupContent);

      // Add marker to layer
      this.markersLayer?.addLayer(marker);
    });

    // Auto-fit map bounds to show all markers
    if (validClockings.length > 0) {
      const bounds = L.latLngBounds(
        validClockings.map(c => [c.clockLocation!.lat, c.clockLocation!.lon])
      );
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  private getMarkerColor(status: string): string {
    switch (status) {
      case 'Valid':
        return '#4CAF50'; // Green
      case 'Review Needed':
        return '#FFC107'; // Yellow
      case 'Invalid':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Grey
    }
  }

  private buildPopupContent(clocking: IClockingResponse): string {
    const clockType = clocking.isClockIn ? 'Clock In' : 'Clock Out';
    const activity = clocking.employeeActivityName || 'No Activity';
    const approvalStatus = clocking.geoFenceApprovalStatus 
      ? `<br><strong>Approval:</strong> ${clocking.geoFenceApprovalStatus}`
      : '';

    return `
      <div style="min-width: 200px;">
        <h4 style="margin: 0 0 8px 0;">${clocking.employeeName}</h4>
        <p style="margin: 4px 0;"><strong>Type:</strong> ${clockType}</p>
        <p style="margin: 4px 0;"><strong>Time:</strong> ${clocking.formattedTime || clocking.date}</p>
        <p style="margin: 4px 0;"><strong>Activity:</strong> ${activity}</p>
        <p style="margin: 4px 0;"><strong>Status:</strong> ${clocking.geoFenceStatus}</p>
        ${approvalStatus}
        <p style="margin: 4px 0; font-size: 11px; color: #666;"><strong>ID:</strong> ${clocking.clockId}</p>
      </div>
    `;
  }
}
