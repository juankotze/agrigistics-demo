export interface IClockingResponse {
  clockId: string; // Unique Clock ID
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  employeeActivityName: string; // e.g., "General Work", "Harvesting", null if absent
  date: string; // ISO String (e.g., "2025-12-09T07:15:00+02:00"), null if absent
  formattedTime: string | null; // Display time (e.g., "07:15"), null if absent
  isClockIn: boolean | null; // True = Clock In, False = Clock Out, null if absent

  // Geolocation Data, null if absent
  clockLocation: {
    lat: number;
    lon: number;
  } | null;

  shiftStartTime: string; // HH:mm, employees in this list will always have a shift
  geoFenceStatus: 'Valid' | 'Review Needed' | 'Invalid';
  geoFenceApprovalStatus: 'Approved' | 'Declined' | null; // If null, pending
}

export class ClockingResponse implements IClockingResponse {
  clockId: string = '';
  employeeId: string = '';
  employeeName: string = '';
  employeeNumber: string = '';
  employeeActivityName: string = '';
  date: string = '';
  formattedTime: string | null = null;
  isClockIn: boolean | null = null;
  clockLocation: { lat: number; lon: number } | null = null;
  shiftStartTime: string = '';
  geoFenceStatus: 'Valid' | 'Review Needed' | 'Invalid' = 'Valid';
  geoFenceApprovalStatus: 'Approved' | 'Declined' | null = null;

  constructor(initial?: Partial<IClockingResponse>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
