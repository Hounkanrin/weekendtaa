import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  file: File

  @Input() name?: string;

  @ViewChild("inputRef") inputRef;

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.file = this.inputRef.nativeElement.files[0];

    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);

    console.log(formData);
  }

}
