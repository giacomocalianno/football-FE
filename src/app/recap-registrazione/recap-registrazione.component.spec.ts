import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapRegistrazioneComponent } from './recap-registrazione.component';

describe('RecapRegistrazioneComponent', () => {
  let component: RecapRegistrazioneComponent;
  let fixture: ComponentFixture<RecapRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapRegistrazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
