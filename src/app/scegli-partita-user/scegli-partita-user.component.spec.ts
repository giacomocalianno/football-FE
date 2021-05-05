import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliPartitaUserComponent } from './scegli-partita-user.component';

describe('ScegliPartitaUserComponent', () => {
  let component: ScegliPartitaUserComponent;
  let fixture: ComponentFixture<ScegliPartitaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScegliPartitaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScegliPartitaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
