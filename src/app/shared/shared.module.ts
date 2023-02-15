import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
  declarations: [
    SafeUrlPipe
  ],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule, FileUploadModule, SafeUrlPipe],
})
export class SharedModule { }
