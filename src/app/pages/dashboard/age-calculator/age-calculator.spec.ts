import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCalculator } from './age-calculator';

describe('AgeCalculator', () => {
  let component: AgeCalculator;
  let fixture: ComponentFixture<AgeCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
