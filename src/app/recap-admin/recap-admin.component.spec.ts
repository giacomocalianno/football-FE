import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapAdminComponent } from './recap-admin.component';

describe('RecapAdminComponent', () => {
  let component: RecapAdminComponent;
  let fixture: ComponentFixture<RecapAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
