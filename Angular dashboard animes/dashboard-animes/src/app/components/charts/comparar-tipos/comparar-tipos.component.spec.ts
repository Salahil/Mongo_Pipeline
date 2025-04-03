import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararTiposComponent } from './comparar-tipos.component';

describe('CompararTiposComponent', () => {
  let component: CompararTiposComponent;
  let fixture: ComponentFixture<CompararTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompararTiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompararTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
