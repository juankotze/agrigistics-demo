import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoclockMapComponent } from './geoclock-map.component';

describe('GeoclockMapComponent', () => {
  let component: GeoclockMapComponent;
  let fixture: ComponentFixture<GeoclockMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoclockMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoclockMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
