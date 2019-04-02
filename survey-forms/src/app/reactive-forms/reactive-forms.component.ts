import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { SurveyInfo } from '../common/survey-info';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  jobs = [
    'Student',
    'Full Time Job',
    'Full Time Learner',
    'Prefer not to say',
    'Other'
  ];
  recomends = ['Definitely', 'Maybe', 'Not sure'];
  fccs = ['Challengs', 'Projects', 'Community', 'Open Source'];
  // tslint:disable-next-line:max-line-length
  things = [
    'Front-end Projects',
    'Back-end Projects',
    'Data Visualization',
    'Challenges',
    'Open Source Community',
    'Gitter help rooms',
    'Videos',
    'City Meetups',
    'Wiki',
    'Forum',
    'Additional Courses'
  ];
  commends = '';
  surveyForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.surveyForm = this.createSurveyForm(formBuilder);
  }

  createSurveyForm(formBuilder: FormBuilder) {
    const formThings = this.things.map(control => new FormControl(false));
    const unSelectdBox = new FormControl(false);
    return formBuilder.group({
      student: formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        age: ['', Validators.required]
      }),
      job: '',
      recommend: ['', Validators.required],
      fcc: '',
      thing: new FormArray(formThings),
      unselectd: unSelectdBox,
      commend: ''
    });
  }
  ngOnInit() {
    this.onChanges();
  }
  // TODO: Remove this when we're done
  // To be able to check the status of each form-field
  get diagnostic() {
    return JSON.stringify(this.surveyForm);
  }
  get email() {
    return this.surveyForm.get('email');
  }
  get name() {
    return this.surveyForm.get('name');
  }
  get f() {
    return this.surveyForm.controls;
  }
  onSubmit() {
    if (this.surveyForm.invalid) {
      return;
    }
    this.submitted = true;
    // Make sure to create a deep copy of the form-model
    const result: SurveyInfo = Object.assign({}, this.surveyForm.value);
    result.student = Object.assign({}, result.student);
    // fectch data form array data
    // Filter out the unselected ids
    const selectedPreferences = this.surveyForm.value.thing
      .map((checked, index) => (checked ? this.things[index] : null))
      .filter(value => value !== null);
    // Do something with the result
    // Do useful stuff with the gathered data
    result.things = selectedPreferences;
    alert('Successfull!!!');
    console.log(result);
  }

  onChanges(): void {
    // Subscribe to changes on the selectAll checkbox
    this.surveyForm.get('unselectd').valueChanges.subscribe(bool => {
      this.surveyForm
        .get('thing')
        .patchValue(Array(this.things.length).fill(bool), {
          emitEvent: false
        });
    });

    // Subscribe to changes on the  checkboxes
    this.surveyForm.get('thing').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (this.surveyForm.get('unselectd').value !== allSelected) {
        this.surveyForm
          .get('unselectd')
          .patchValue(allSelected, { emitEvent: false });
      }
    });
  }
  /*
    .ng-valid
    .ng-invalid
    .ng-pending
    .ng-pristine
    .ng-dirty
    .ng-untouched
    .ng-touched
     */
}
