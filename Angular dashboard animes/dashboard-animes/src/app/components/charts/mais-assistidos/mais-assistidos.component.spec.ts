import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisAssistidosComponent } from './mais-assistidos.component';

describe('MaisAssistidosComponent', () => {
  let component: MaisAssistidosComponent;
  let fixture: ComponentFixture<MaisAssistidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisAssistidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisAssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
