import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAltasComponent } from './notas-altas.component';

describe('NotasAltasComponent', () => {
  let component: NotasAltasComponent;
  let fixture: ComponentFixture<NotasAltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasAltasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
