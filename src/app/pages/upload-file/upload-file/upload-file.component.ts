import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filterResponse, UploadProgress } from 'src/app/shared/operators/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  @ViewChild('uploadInputlabel') uploadInputlabel: any;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event){
   const selectedFiles = <FileList>event.srcElement.files;
   //this.uploadInputlabel.nativeElement.firstChild.textContent = selectedFiles[0]?.name;

    const fileNames = [];
    this.files = new Set();
    for(let i=0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i]?.name)
      this.files.add(selectedFiles[i]);
    }
    this.uploadInputlabel.nativeElement.firstChild.textContent = fileNames.join('; ');
    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadService.upload(this.files, environment.BASE_URL+ '/uploads/')
      .pipe(
        UploadProgress(progress=>{
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => console.log('Upload concluido'));
        // .subscribe((event: HttpEvent<Object>) => {
        //   if(event.type==HttpEventType.Response){
        //     console.log('Upload concluido');
        //   }else if(event.type==HttpEventType.UploadProgress){
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     this.progress = percentDone;
        //   }
        // });
    }
  }
  onDownloadExcel(){
   this.uploadService.download(environment.BASE_URL+'/downloadPDF?name=Semana do Pescado.xlsx')
   .subscribe((res:any)=>{
     const file = new Blob([res],{
       type: res.type
     });

     const blob = window.URL.createObjectURL(file);

     const link = document.createElement('a');
     link.href = blob;
     link.download = 'Semana do Pescado.xlsx';

     link.click();

     window.URL.revokeObjectURL(blob);
     link.remove();
   });
  }

  onDownloadPDF(){
    this.uploadService.download(environment.BASE_URL+'/downloadPDF?name=bg_bug_to_fix.pdf')
    .subscribe((res:any)=>{
      const file = new Blob([res],{
        type: res.type
      });

      //IE
      if(window.navigator && (window.navigator as any).msSaveOrOpenBlob){
        (window.navigator as any).msSaveOrOpenBlob(file);
        return;
      }
 
      const blob = window.URL.createObjectURL(file);
 
      const link = document.createElement('a');
      link.href = blob;
      link.download = 'bg_bug_to_fix.pdf';
 
      link.click();
 
      window.URL.revokeObjectURL(blob);
      link.remove();
      /*
      res =>{
        const file = new Blob([res], { type: res.type });
			  const blob = window.URL.createObjectURL(file);
			  window.open(blob);
			  saveAs(blob, 'bg_bug_to_fix.pdf');
			}), (error: any) => console.log('Error downloading the file'),
			                    () => console.info('File downloaded successfully');

      */
    });
  }

}
