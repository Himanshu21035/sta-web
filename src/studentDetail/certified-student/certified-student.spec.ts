import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedStudent } from './certified-student';

describe('CertifiedStudent', () => {
  let component: CertifiedStudent;
  let fixture: ComponentFixture<CertifiedStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertifiedStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifiedStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
