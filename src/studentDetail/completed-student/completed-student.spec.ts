import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedStudent } from './completed-student';

describe('CompletedStudent', () => {
  let component: CompletedStudent;
  let fixture: ComponentFixture<CompletedStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
