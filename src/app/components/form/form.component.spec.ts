import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { FormService } from '../../services/form/form.service';

import { FormComponent } from './form.component';

const mockFormService = new FormService();

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [FormComponent],
      providers: [
        MatSnackBar,
        { provide: FormService, useValue: mockFormService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should require an the email address 1`, () => {
    const emailControl = component.form.get('email');
    emailControl?.patchValue(null);
    fixture.detectChanges();
    expect(emailControl?.valid).toBeFalse();
  });

  it(`should require an email address 2`, () => {
    const emailControl
      = component.form.get('email');
    emailControl?.patchValue('user');
    fixture.detectChanges();
    expect(emailControl?.valid).toBeFalse();
    emailControl?.patchValue('user@email.com');
    fixture.detectChanges();
    expect(emailControl?.valid).toBeTrue();
  });


  const emailValidationTests = [
    { value: null, valid: false },
    { value: undefined, valid: false },
    { value: 'user@email.com', valid: true },
    { value: 'user@email', valid: false },
  ];

  emailValidationTests.forEach(test => {
    it(`should validate the email address: "${test.value}"`,
      () => {
        const emailControl = component.form.get('email');
        emailControl?.patchValue(test.value);
        fixture.detectChanges();
        expect(emailControl?.valid).toBe(test.valid);
      });
  });

  it(`should display email field`, () => {
    const emailInput = fixture.debugElement.nativeElement
      .querySelector('input[formControlName="email"]')
    expect(emailInput).toBeTruthy();
  });

  it(`should display email field`, () => {
    const emailInput = fixture.debugElement.nativeElement.querySelector('input[formControlName="email"]')
    expect(emailInput).toBeTruthy();

    const control = component.form.get('email');
    control?.patchValue("not a valid email");
    control?.markAllAsTouched();
    fixture.detectChanges();

    const div = <HTMLLabelElement>emailInput.parentNode;
    const errors: NodeListOf<HTMLLabelElement> = div.querySelectorAll('.errors');
    expect(errors.length).toEqual(1);
    expect(errors[0].innerText).toEqual(component.errors['pattern']);
  });

});
