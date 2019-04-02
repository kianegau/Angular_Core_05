import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Builder } from 'protractor';
import { ContactRequests, PersonalData } from '../contact-requests';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  countries = ['USA', 'Germany', 'Italy', 'France'];
  requestTypes = ['Claim', 'Feedback', 'Help Request'];
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // this.contactForm = this.createFormGroup();
    this.contactForm = this.createFormWithFormBuilder(formBuilder);
  }
  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        email: new FormControl(),
        mobile: new FormControl(),
        country: new FormControl()
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }
  createFormWithFormBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData1: formBuilder.group({
        email: 'defauil@mail.com',
        mobile: '',
        country: ''
      }),
      requestType: '',
      text: ''
    });
  }
  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: ContactRequests = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    console.log(result);
  }
  revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
  }
  ngOnInit() {}
}
