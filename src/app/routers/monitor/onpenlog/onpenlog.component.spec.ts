import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnpenlogComponent } from './onpenlog.component';

describe('OnpenlogComponent', () => {
  let component: OnpenlogComponent;
  let fixture: ComponentFixture<OnpenlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnpenlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnpenlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
