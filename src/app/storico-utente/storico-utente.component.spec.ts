import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoUtenteComponent } from './storico-utente.component';

describe('StoricoUtenteComponent', () => {
  let component: StoricoUtenteComponent;
  let fixture: ComponentFixture<StoricoUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
