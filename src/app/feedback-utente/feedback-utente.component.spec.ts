import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUtenteComponent } from './feedback-utente.component';

describe('FeedbackUtenteComponent', () => {
  let component: FeedbackUtenteComponent;
  let fixture: ComponentFixture<FeedbackUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
