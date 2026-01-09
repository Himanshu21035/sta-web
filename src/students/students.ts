import { Component } from '@angular/core';
import { studentModel } from '../model/studentModel';
import { studentsDummyData } from '../model/dummyData';
import { StudentService } from '../services/student.service';
import { OnInit } from '@angular/core';
import { StudentDetail } from '../student-detail/student-detail';
import { FormBuilder, FormGroup,ReactiveFormsModule , Validators, ValueChangeEvent, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { exportCSV } from '../services/csvExport';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
@Component({
  selector: 'app-students',
  imports: [ɵInternalFormsSharedModule, CommonModule, ReactiveFormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit{
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  //  students;
  // showModal = signal(false);
  showDetailsModal = signal(false);
  isModelOpen:boolean=false;
  addStudentModel:FormGroup
  phoneRegex = /^[6-9]\d{9}$/;
  emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  registrationNumber:string='';
  editingStudent:studentModel=studentsDummyData[0];
  // today = new Date().toISOString().split('T')[0];
  currentStudentRegNum = '';
  selectedStudent = signal<studentModel | null>(null);
  
  // Filter state
  activeFilter = signal<string>('all');
searchTerm = signal<string>('');
  // Get students from service
  allStudents: any;
  students = computed(() => {
    let filtered = this.allStudents();
    
    // Apply filter
    switch (this.activeFilter()) {
      case 'certified':
        filtered = filtered.filter((s: studentModel) => s.isCertified && !s.isDeleted);
        break;
      case 'completed':
        filtered = filtered.filter((s: studentModel) => s.isCompleted && !s.isDeleted);
        break;
      case 'active':
        filtered = filtered.filter((s: studentModel) => s.isActive && !s.isDeleted);
        break;
      case 'inactive':
        filtered = filtered.filter((s: studentModel) => !s.isActive && !s.isDeleted);
        break;
      case 'feesSubmitted':
        filtered = filtered.filter((s: studentModel) => !s.isFeesPending && !s.isDeleted);
        break;
      case 'feesPending':
        filtered = filtered.filter((s: studentModel) => s.isFeesPending && !s.isDeleted);
        break;
      case 'deleted':
        filtered = filtered.filter((s: studentModel) => s.isDeleted);
        break;
      case 'all':
      default:
        filtered = filtered.filter((s: studentModel) => !s.isDeleted);
        break;
    }
    
    // Apply search
    const sterm=this.searchTerm();
    if (sterm) {
      const term = sterm.toLowerCase();
      filtered = filtered.filter((s:studentModel) => 
        s.name?.toLowerCase().includes(term) ||
        s.regNum?.toLowerCase().includes(term) ||
        s.Email?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  });
  constructor(private fb:FormBuilder, private studentService:StudentService){
    this.allStudents = this.studentService.students;
    this.addStudentModel=this.fb.group({
      name:['', [Validators.required, Validators.maxLength(100)]],
      regNum:['', [Validators.required]],
      batchStart:['',[Validators.required]],
      batchEnd:['',[Validators.required]],
      DateOfJoin:['',[Validators.required]],
      Course:this.fb.control<string[]>([]),
      FatherName: ['', [Validators.required, Validators.maxLength(100)]],
      Address:['',[Validators.required]],
      PhonePrimary:['',[Validators.required, Validators.pattern(this.phoneRegex)]],
      PhoneSecondary:['',Validators.pattern(this.phoneRegex)],
      dob:['',[Validators.required]],
      HighestQualification:['',[Validators.required]],
      Email:['',[Validators.required,Validators.pattern(this.emailRegex)]],
      Fees:[0,[Validators.required]],
    });
    // this.students= this.studentService.students;
    // console.log(this.students());
    
  };
async ngOnInit(): Promise<void> {
this.title='Add New Student';
if (this.students().length === 0) {
            // console.log('📥 Cache empty, loading students...');
            this.studentService.getStudents().subscribe({
                next: (res) => {
                    // console.log('✅ Students loaded:', res);
                    // Signal automatically updated inside service
                },
                error: (err) => {
                    console.error('❌ Error loading students:', err);
                }
            });
        } else {
            // console.log('✅ Using cached students:', this.students());
        }
    
}
  // Details modal
  openDetailsModal(student: studentModel): void {
    this.selectedStudent.set(student);
    this.showDetailsModal.set(true);
  }
  
  closeDetailsModal(): void {
    this.showDetailsModal.set(false);
    this.selectedStudent.set(null);
  }
  
  // Action methods
  certifyStudent(regNum: string): void {
    this.studentService.certifyStudent(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
  
  markAsCompleted(regNum: string): void {
    this.studentService.markAsCompleted(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
  
  markActive(regNum: string): void {
    this.studentService.markActive(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
  
  markInactive(regNum: string): void {
    this.studentService.markInactive(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
 markFeesSubmitted(regNum: string): void {
    this.studentService.feeSubmit(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
  restoreStudent(regNum: string): void {
   this.studentService.restoreStudent(regNum).subscribe({
      next: () => {
        this.studentService.refreshStudents();
        this.closeDetailsModal();
      }
    });
  }
 onSearch(event: any): void {
    this.searchTerm.set(event.target.value);  // ← Set signal value
  }
  
  clearSearch(): void {
    this.searchTerm.set('');  // ← Set signal value
    // Optional: Clear input field
    const searchInput = document.querySelector('.searchBar input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
  }
  exportToCSV(){
    // exportCSV(this.students, 'studentList');
  }
 showModal = false;
editMode = false;
showDetailModal=false;
 title = 'Add New Student';  // ✅ Set explicitly
isLoading:boolean=false;
isLoadingRegNum:boolean=false;
openModal(): void {
  setTimeout(() => {
    this.showModal = true;
    this.editMode = false;
    this.isLoading = true;
    this.isLoadingRegNum = true;
    this.title='Add New Student';
    // ✅ Reset form first
    this.addStudentModel.reset();
    
    this.studentService.generateRegNum().subscribe({
        next: (res) => {
            
            this.addStudentModel.patchValue({
                regNum: res.regNum,
                PhoneSecondary: ""
            }, { onlySelf: true, emitEvent: false });
            
            this.addStudentModel.get('regNum')?.enable();
            
            this.addStudentModel.get('regNum')?.setValue(res.regNum);
            const item=document.getElementById('regNum');
            
            this.isLoadingRegNum = false;
            this.isLoading = false;
        },
        error: (err) => {
            console.error('❌ API Error:', err);
            this.isLoading = false;
        }
    });
  }, 0);
    
}

closeModal(event?: MouseEvent): void {
  this.showModal = false;
  this.editMode = false;
  this.addStudentModel.reset();
}

editStudent(student: any): void {
  this.title='Edit Details'
  this.showModal = true;
  this.editMode = true;
  this.addStudentModel.patchValue({...student,
        DateOfJoin: this.formatDateForInput(student.DateOfJoin),
        dob: this.formatDateForInput(student.dob),
        batchStart: student.batchStart,  // Already string
        batchEnd: student.batchEnd});
        this.editingStudent=student;
}

private formatDateForInput(date: string | Date): string {
    if (!date) return '';
    
    const d = new Date(date);
    
    // Check if valid date
    if (isNaN(d.getTime())) {
        console.error('Invalid date:', date);
        return '';
    }
    
    // Format as YYYY-MM-DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

get today(): string {
  return new Date().toISOString().split('T')[0];
}

isFormValid(): boolean {
  return this.addStudentModel.valid;
}

formErrorsCount(): number {
  return Object.keys(this.addStudentModel.errors || {}).length;
}

hasError(controlName: string, errorName: string) {
  return this.addStudentModel.get(controlName)?.hasError(errorName) && 
         this.addStudentModel.get(controlName)?.touched;
}

onSubmit(title:string) {
  if(title==='Add New Student'){
  if (this.addStudentModel.valid) {
    this.isSubmitting=true;
    this.submitError=false;
    this.submitSuccess=false;
    const studentData:studentModel={
      ...this.addStudentModel.value,
      isCertified: false,
	isCompleted:false,
	isDeleted:false,
	isFeesPending: true,
    isActive: true
    }
    this.studentService.addStudent(studentData).subscribe({
      next: (res) => {
        // console.log('✅ Student added:', res);
        this.studentService.refreshStudents();  // Update cache
        this.closeModal();
      },
      error: (err) => console.error('❌ Add failed:', err)
    });
    // console.log(this.addStudentModel.value);
  }}
  else{
if(this.addStudentModel.valid){
    this.isSubmitting=true;
    this.submitError=false;
    this.submitSuccess=false;
    const studentData:studentModel={
      ...this.addStudentModel.value,
      isCertified: this.editingStudent.isCertified,
	isCompleted:this.editingStudent.isCompleted,
	isDeleted:this.editingStudent.isDeleted,
	isFeesPending: this.editingStudent.isFeesPending,
    isActive: this.editingStudent.isActive
    }
    this.studentService.updateStudent(studentData.regNum, studentData).subscribe({
      next:(res)=>{
        // console.log('Student edited');
        this.studentService.refreshStudents();
        this.closeModal();
      },
      error:(err)=>{
        console.error("edit failed");
      }
    })
}
  }
}
trackByRegNum(index: number, student: studentModel): string {
    return student.regNum;
  }
resetForm() {
  this.addStudentModel.reset();
}
dummyfn(){
  
}
setFilter(filter: string): void {
    if (filter === 'deleted') {
      // Load deleted students from API if needed
      this.studentService.getStudents(true).subscribe();
    }
    this.activeFilter.set(filter);
  }

// Add this method to your component class
deleteStudent(regNum: string): void {
  this.studentService.softDelete(regNum).subscribe({
    next: () => {
      this.studentService.refreshStudents();
      this.closeDetailsModal();
    },
    error: (err) => {
      console.error('Delete failed:', err);
    }
  });
}


}
