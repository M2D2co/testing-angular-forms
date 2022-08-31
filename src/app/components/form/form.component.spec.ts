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

  // it(`should require an email address`, () => {
  //   TODO
  //   expect(emailControl?.valid).toBeFalse();
  // });

  
  // it(`email address should be valid`, () => {
  //   TODO
  //   expect(emailControl?.valid).toBeFalse();
  // });


  // const emailValidationTests = [
  //   { value: null, valid: false },
  //   { value: 'user', valid: false },
  //   { value: 'user@email.com', valid: true },
  //   // TODO more use cases
  // ];
  // emailValidationTests.forEach(test => {
  //   // TODO
  // });



  // TODO refactor to check for the other types of error (length and required)
  const emailErrors = [
    { value: null, errors: 'required' },
    { value: undefined, errors: 'required' },
    { value: 0, errors: 'pattern' },
    { value: true, errors: 'pattern' },
    { value: "", errors: 'required' },
    { value: "not a valid email", errors: 'pattern' },
    { value: 'very-long-but-structurally-valid@email.com', errors: 'maxlength'},
    // { value: 'My very long diatribe about why I am not providing a valid email address', errors: ['pattern', 'maxlength']}
  ];
  emailErrors.forEach(test => {
    fit('should display error messages', () => {
      const emailInput = fixture.debugElement.nativeElement
          .querySelector('input[formControlName="email"]')
      expect(emailInput).toBeTruthy();

      const control = component.form.get('email');
      control?.patchValue("not a valid email");
      control?.markAllAsTouched();
      fixture.detectChanges();

      const div = <HTMLLabelElement>emailInput.parentNode;
      const errors: NodeListOf<HTMLLabelElement> = 
      div.querySelectorAll('.errors');


      expect(errors.length).toEqual(1);
      expect(errors[0].innerText).toEqual(component.errors['pattern']);
    })
  })

});
