import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAssistidosComponent } from './top-assistidos.component';

describe('TopAssistidosComponent', () => {
  let component: TopAssistidosComponent;
  let fixture: ComponentFixture<TopAssistidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAssistidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
