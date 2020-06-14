import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  form: FormGroup;
  showForm: boolean;
  loggedError: boolean;
  sending: boolean;

  options = ['Inquire about hiring us', 'Other'];
  solutions = ['Website', 'Web Application', 'Progressive Web Application', 'Native Application', 'Desktop Application',
  'Upgrade/Fix Application', 'Other'];

  matcher: ErrorStateMatcher;
  subscriptions: Subscription[] = [];

  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactComponent>
  ) { }

  ngOnInit() {
    this.showForm = true;
    this.loggedError = false;
    this.sending = false
    this.matcher = new MyErrorStateMatcher();
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Initialize the form group
   */
  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      company: new FormControl('', Validators.maxLength(50)),
      reason: new FormControl(this.options[0], Validators.required),
      solution: new FormControl(''),
      details: new FormControl('', Validators.maxLength(300))
    });
  }

  close(response) {
    this.dialogRef.close(response);
  }

  /**
   * Send the form by email
   * @param form Form object
   */
  send(form: FormGroup) {
    this.sending = true;
    this.subscriptions.push(this.contactService.sendForm(form).subscribe(response => {
      if (response.status === 200) {
        this.close(200);
      } else {
        this.close(500);
        console.error(response);
      }
      this.sending = false;
    }));
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
