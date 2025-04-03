import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularidadeTempoComponent } from './popularidade-tempo.component';

describe('PopularidadeTempoComponent', () => {
  let component: PopularidadeTempoComponent;
  let fixture: ComponentFixture<PopularidadeTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularidadeTempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularidadeTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
