import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableListComponent } from './available-list.component';

describe('AvailableListComponent', () => {
  let component: AvailableListComponent;
  let fixture: ComponentFixture<AvailableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableListComponent]
    });
    fixture = TestBed.createComponent(AvailableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
