import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelacoesComponent } from './correlacoes.component';

describe('CorrelacoesComponent', () => {
  let component: CorrelacoesComponent;
  let fixture: ComponentFixture<CorrelacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrelacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrelacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
