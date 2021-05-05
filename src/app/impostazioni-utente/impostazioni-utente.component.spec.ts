import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniUtenteComponent } from './impostazioni-utente.component';

describe('ImpostazioniUtenteComponent', () => {
  let component: ImpostazioniUtenteComponent;
  let fixture: ComponentFixture<ImpostazioniUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpostazioniUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostazioniUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
