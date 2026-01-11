import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';
import { MatDatepicker } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { EnquiryService } from '../services/enquiry.service';
NativeDateModule
MatDatepicker
@Component({
  selector: 'app-enquiry',
  imports: [CommonModule , NativeDateModule,ReactiveFormsModule],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css',
})
export class Enquiry {
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  enquiryForm: FormGroup;
  phoneRegex = /^[6-9]\d{9}$/;
  emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  courses:string[]=['Tally ERP 9','Graphic Designing','Web Development','Digital Marketing','Basic Computer','Advanced Excel','ADCA','DCA','C/C++','Python Programming','AutoCAD'];
  constructor(private fb:FormBuilder, private enquiryService:EnquiryService){
    this.enquiryForm=this.fb.group({
      name:['', Validators.required],
      mob:['',[Validators.required,Validators.pattern(this.phoneRegex)]],
      email:['',[Validators.required,Validators.email,Validators.pattern(this.emailRegex)]],
      address:['',Validators.required],
      courses:this.fb.control<string[]>([]),
      joiningDate:['',Validators.required]
    })
  }
  submitEnquiry(){
    if(this.enquiryForm.valid&&(new Date(this.enquiryForm.value.joiningDate) > new Date())){
      // console.log(this.enquiryForm.value);
      const submitbtn=document.getElementById('submitbtn');
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;
      this.enquiryService.submitEnquiry(this.enquiryForm.value).subscribe({
        next:(response)=>{
          // console.log('Success:', response);
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.enquiryForm.reset();
          
          const successDiv = document.querySelector('.success-message');
          const container=document.querySelector('.popup')
          if (successDiv instanceof HTMLElement && container instanceof HTMLElement) {
            container.style.display = 'flex';
            successDiv.style.display = 'flex';
          }
           setTimeout(() => {
            this.submitSuccess = false;
            if(successDiv instanceof HTMLElement && container instanceof HTMLElement){
              successDiv.style.display = 'none';
              container.style.display = 'none';
            }
          }, 5000);
        },
        error:(error)=>{
          console.error('Error:', error);
          this.isSubmitting = false;
          this.submitError = true;
          const errorDiv = document.querySelector('.error-message');
          const container=document.querySelector('.popup')
          if (errorDiv instanceof HTMLElement && container instanceof HTMLElement) {
            container.style.display = 'flex';
            errorDiv.style.display = 'flex';
          }
          setTimeout(() => {
            this.submitError=false;
           const errorDiv = document.querySelector('.error-message');
            if (errorDiv instanceof HTMLElement && container instanceof HTMLElement ) {
              errorDiv.style.display = 'none';
              container.style.display = 'none';
            }
          }, 5000);
        }
      })
    }else if(new Date(this.enquiryForm.value.joiningDate) <= new Date()){
      alert("Please select a valid joining date");
    }
    else{
      alert("Invalid form data")
    }
  }
  onCourseAdd(course:string,event:Event){
    const chkbox = event.target as HTMLInputElement;
    const selectedCourses = this.enquiryForm.controls['courses'].value as string[];
    if (chkbox.checked){
      this.enquiryForm.controls['courses'].setValue([...selectedCourses, course]);
    }else{
      this.enquiryForm.controls['courses'].setValue(selectedCourses.filter(c=>c!==course));
    }
  }
}
