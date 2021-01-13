import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTableComponent } from './manage-table.component';

describe('ManageTableComponent', () => {
  let component: ManageTableComponent;
  let fixture: ComponentFixture<ManageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
