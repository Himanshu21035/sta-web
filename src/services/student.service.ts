import { Injectable, computed, effect } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of, BehaviorSubject, ObservableLike } from "rxjs";
import { environment } from "../environments/environment";
import { studentModel } from "../model/studentModel";
import { signal } from "@angular/core";
import { tap, map } from "rxjs";
import { Students } from "../students/students";
interface DashboardStats {
  total: number;
  certified: number;
  completed: number;
  active: number;
  feesCollected: number;
  feesPending: number;
  totalRevenue: number;
  studentsWithFeesPending: number;
  studentsWithFeesSubmitted: number;
}
@Injectable({
    providedIn:'root'
})

export class StudentService{
    private scriptUrl=environment.studentApiURL;
    constructor(private http:HttpClient){
        effect(()=>{
            this.token.set(this.getToken());
            this._students.set(null);
        })
    }
    private token=signal<string>('');
    private getToken():string{
        return localStorage.getItem('token')||'';
    }
    // token =localStorage.getItem('token')||cookieStore.get('token')||' ';
    private _students=signal<studentModel[]|null>(null);
    public students=computed(()=>this._students()||[]);
    // public students$ = this.getStudents();
    getStudents(forceRefresh=false):Observable<studentModel[]>{
        if(!forceRefresh&& this._students()){
            return of(this._students()!);
        }
        const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.getToken()};
        return this.http.get<{students: studentModel[]}>(this.scriptUrl+'/students/get_students', {headers:headers})
        .pipe(
             map(response => response.students),
            tap(students=>{
                this._students.set(students);
            })
        );
    }


    refreshStudents():Observable<studentModel[]>{
        return this.getStudents(true);
    }
    clearCache():void{
        this._students.set(null);
    }

    addStudent(std:studentModel):Observable<null>{
        const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.token()};
        const body=std;
        this.refreshStudents();
        return this.http.post<any>(this.scriptUrl+'/students/add_student',body,{headers:headers});

    }
    getStudentByRegNum(regNum:string):Observable<studentModel>{
        const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.token()};
        const params=new HttpParams().set('regNum',regNum);
        return this.http.get<studentModel>(this.scriptUrl+`/students/get_student/${regNum}`,{headers:headers,params});
    }
    softDelete(regNum:string):Observable<any>{
         const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
const body={
    regNum:regNum
}
         return this.http.put<any>(this.scriptUrl+'/students/delete_student',body,{headers:headers});
    }
    getDeletedStudents():Observable<studentModel[]>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
return this.http.put<any>(this.scriptUrl+'/students/get_deleted',{headers:headers});
    }
    updateStudent(regNum:string,student:studentModel):Observable<any>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
         const body={regNum:regNum, student:student};
         return this.http.put<any>(this.scriptUrl+'/students/update_student', body,{headers:headers});
    }
    getCertifiedStudents():Observable<studentModel[]>{
         const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.token()};
         return this.http.get<studentModel[]>(this.scriptUrl+'/students/get_certified',{headers:headers});
    }
    getCompletedStudents():Observable<studentModel[]>{
         const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.token()};
         return this.http.get<studentModel[]>(this.scriptUrl+'/students/completed_students',{headers:headers});
    }
    // getDashboardStats():Observable<any>{
    //      const headers={'Content-Type':'application/json', 'Authorization':'Bearer '+this.token()};
    //      return this.http.get<any>(this.scriptUrl+'/students/dashboard',{headers:headers});
    // }
    generateRegNum():Observable<any>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        return this.http.get<any>(this.scriptUrl+'/students/regNum',{headers:headers});
    }
    certifyStudent(regNum:string):Observable<null>{
         const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/certify/${regNum}`,null,{headers:headers});
    }
    markAsCompleted(regNum:string):Observable<any>{
         const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/completed/${regNum}`,null,{headers:headers});
    }
    markInactive(regNum:string):Observable<any>{
         const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/inactive/${regNum}`,null,{headers:headers});
    }
    markActive(regNum:string):Observable<any>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/active/${regNum}`,null,{headers:headers});
    }
    feeSubmit(regNum:string):Observable<any>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/feeSubmit/${regNum}`,null,{headers:headers});
    }
    restoreStudent(regNum:string):Observable<any>{
        const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
        const params=new HttpParams().set('regNum',regNum);
         return this.http.put<any>(this.scriptUrl+`/students/markUndeleted/${regNum}`,null,{headers:headers});
    }

getDashboardStats(): Observable<{message: string, stats: DashboardStats}> {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
});
  return this.http.get<{message: string, stats: DashboardStats}>(
    `${this.scriptUrl}/students/dashboard`,
    { headers: headers}
  );
}



}

// function signal<T>(arg0: null) {
//     throw new Error("Function not implemented.");
// }
