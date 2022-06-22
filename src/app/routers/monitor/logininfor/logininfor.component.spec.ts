import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogininforComponent } from './logininfor.component';

describe('LogininforComponent', () => {
  let component: LogininforComponent;
  let fixture: ComponentFixture<LogininforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogininforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogininforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
