import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  title = "cloudsSorage";
  selectedFile: File = null;
  url;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage) {}
  ngOnInit() {}
  onFileSelected(event) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `Audio/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Audio/${n}`, file);
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.url = url;
            }
            console.log(this.url);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }}
