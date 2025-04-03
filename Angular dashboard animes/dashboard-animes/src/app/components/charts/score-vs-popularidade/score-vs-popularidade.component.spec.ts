import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreVsPopularidadeComponent } from './score-vs-popularidade.component';

describe('ScoreVsPopularidadeComponent', () => {
  let component: ScoreVsPopularidadeComponent;
  let fixture: ComponentFixture<ScoreVsPopularidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreVsPopularidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreVsPopularidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
