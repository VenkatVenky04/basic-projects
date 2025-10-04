import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jokes } from './jokes';

describe('Jokes', () => {
  let component: Jokes;
  let fixture: ComponentFixture<Jokes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jokes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jokes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
