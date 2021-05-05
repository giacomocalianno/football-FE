import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistrazioneComponent } from './pre-registrazione.component';

describe('PreRegistrazioneComponent', () => {
  let component: PreRegistrazioneComponent;
  let fixture: ComponentFixture<PreRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRegistrazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
