import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrazione2Component } from './registrazione2.component';

describe('Registrazione2Component', () => {
  let component: Registrazione2Component;
  let fixture: ComponentFixture<Registrazione2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Registrazione2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrazione2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
