import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    // this.service.save(this.form.value).subscribe(result?: ((result) => this.onSuccess())) | null, error?: ((error) => this.onError());
    // this.service.save(this.form.value).subscribe(result => this.onSuccess());
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());

  };


  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Saved course!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Error saving course.', '', { duration: 3000 });
  }
}
