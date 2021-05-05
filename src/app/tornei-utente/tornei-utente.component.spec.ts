import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiUtenteComponent } from './tornei-utente.component';

describe('TorneiUtenteComponent', () => {
  let component: TorneiUtenteComponent;
  let fixture: ComponentFixture<TorneiUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneiUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneiUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
