import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvModalComponent } from './cv-modal.component';

describe('CvModalComponent', () => {
  let component: CvModalComponent;
  let fixture: ComponentFixture<CvModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvModalComponent]
    });
    fixture = TestBed.createComponent(CvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
