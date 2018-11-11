import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: 'app-upload1',
  templateUrl: './upload1.component.html',
  styleUrls: ['./upload1.component.css']
})
export class Upload1Component implements OnInit {

  selectedFile: File = null


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0]
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)

    let fdm = fd.append('image', this.selectedFile, this.selectedFile.name)
    console.log('fdm', fd);

  }

  onUpload() {
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)

    this.http.post('https://us-central-fb-cloud-functions-demo.cloud.cloudfunctions.net/uploadFile', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress' + Math.round(event.loaded / event.total) * 100 + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log("res", event);

        }
      }
      )
    console.log("upload1");
  }
}