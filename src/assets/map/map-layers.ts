import * as L from 'leaflet';

const STREET_LAYER = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '© OpenStreetMap contributors',
  }
);

const SATELLITE_LAYER = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution:
      'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and others',
    maxZoom: 20,
  }
);

export const MAP_LAYERS = {
  Street: STREET_LAYER,
  Satellite: SATELLITE_LAYER,
} as const;
