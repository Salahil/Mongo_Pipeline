import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoGeneroComponent } from './distribuicao-genero.component';

describe('DistribuicaoGeneroComponent', () => {
  let component: DistribuicaoGeneroComponent;
  let fixture: ComponentFixture<DistribuicaoGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribuicaoGeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuicaoGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
