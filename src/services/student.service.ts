import { Injectable, computed, effect } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "../environments/environment";
import { studentModel } from "../model/studentModel";
import { signal } from "@angular/core";
import { tap, map } from "rxjs/operators";

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
    providedIn: 'root'
})
export class StudentService {
    private scriptUrl = environment.studentApiURL;
    
    constructor(private http: HttpClient) {
        // ✅ Remove token-related effect
    }

    // ✅ Remove all token-related code
    private _students = signal<studentModel[] | null>(null);
    public students = computed(() => this._students() || []);

    getStudents(forceRefresh = false): Observable<studentModel[]> {
        if (!forceRefresh && this._students()) {
            return of(this._students()!);
        }
        
        // ✅ Remove Authorization header, add withCredentials
        return this.http.get<{students: studentModel[]}>(
            this.scriptUrl + '/students/get_students',
            { withCredentials: true } // ✅ Cookie sent automatically
        ).pipe(
            map(response => response.students),
            tap(students => {
                this._students.set(students);
            })
        );
    }

    refreshStudents(): Observable<studentModel[]> {
        return this.getStudents(true);
    }

    clearCache(): void {
        this._students.set(null);
    }

    addStudent(std: studentModel): Observable<any> {
        // ✅ Remove Authorization header
        this.refreshStudents();
        return this.http.post<any>(
            this.scriptUrl + '/students/add_student',
            std,
            { withCredentials: true } // ✅ Cookie sent automatically
        );
    }

    getStudentByRegNum(regNum: string): Observable<any> {
        return this.http.get<any>(
            this.scriptUrl + `/students/get_student/${regNum}`,
            { withCredentials: true }
        );
    }

    softDelete(regNum: string): Observable<any> {
        const body = { regNum: regNum };
        return this.http.put<any>(
            this.scriptUrl + '/students/delete_student',
            body,
            { withCredentials: true }
        );
    }

    getDeletedStudents(): Observable<any> {
        return this.http.get<any>(
            this.scriptUrl + '/students/get_deleted',
            { withCredentials: true }
        );
    }

    updateStudent(regNum: string, student: studentModel): Observable<any> {
        const body = { regNum: regNum, student: student };
        return this.http.put<any>(
            this.scriptUrl + '/students/update_student',
            body,
            { withCredentials: true }
        );
    }

    getCertifiedStudents(): Observable<any> {
        return this.http.get<any>(
            this.scriptUrl + '/students/get_certified',
            { withCredentials: true }
        );
    }

    getCompletedStudents(): Observable<any> {
        return this.http.get<any>(
            this.scriptUrl + '/students/completed_students',
            { withCredentials: true }
        );
    }

    generateRegNum(): Observable<any> {
        return this.http.get<any>(
            this.scriptUrl + '/students/regNum',
            { withCredentials: true }
        );
    }

    certifyStudent(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/certify/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    markAsCompleted(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/completed/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    markInactive(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/inactive/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    markActive(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/active/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    feeSubmit(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/feeSubmit/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    restoreStudent(regNum: string): Observable<any> {
        return this.http.put<any>(
            this.scriptUrl + `/students/markUndeleted/${regNum}`,
            null,
            { withCredentials: true }
        );
    }

    getDashboardStats(): Observable<{message: string, stats: DashboardStats}> {
        return this.http.get<{message: string, stats: DashboardStats}>(
            `${this.scriptUrl}/students/dashboard`,
            { withCredentials: true }
        );
    }
}
