import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../service/person-services/person.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {

  person: Person;
  updatePersonForm: FormGroup;
  loading: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  get f() {
    return this.updatePersonForm.controls;
  }

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => {
        this.person = person;
        this.initForm();
      })
  }

  initForm() {
    this.updatePersonForm = this.fb.group({
      id: this.person.id,
      firstname: [this.person.firstname, Validators.required],
      lastname: [this.person.lastname, Validators.required],
      email: [this.person.email, [Validators.required, Validators.email]],
      password: this.person.password,
      image: null,
    })
  }

  updatePerson() {
    const formModel = this.updatePersonForm.value;
    this.loading = true;
    console.log('titi');
    if (this.updatePersonForm.valid) {
      console.log('tito');
      const personToUpdate = this.updatePersonForm.value as Person;
      console.log(personToUpdate);
      this.personService.updatePerson(personToUpdate).subscribe(data => console.log(data));
      this.goBack();
    }
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updatePersonForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  goBack() {
    this.personService.goBack();
  }

}
