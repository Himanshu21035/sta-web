import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpParams } from "@angular/common/http";
@Injectable({
    providedIn:'root'
})
export class EnquiryService{
    private scriptUrl=environment.apiURL;
    constructor(private http:HttpClient){}

    submitEnquiry(data:any):Observable<any>{
        const headers={'Content-Type':'text/plain;charset=utf-8'};
        return this.http.post(this.scriptUrl,data,{headers, redirect:'follow'});
    }
//     submitEnquiry(formData: any): Observable<any> {
//     // Convert courses array to JSON string
//     const params = new HttpParams()
//       .set('name', formData.name)
//       .set('email', formData.email)
//       .set('mob', formData.mob)
//       .set('courses', JSON.stringify(formData.courses))
//       .set('address', formData.address)
//       .set('joiningDate', formData.joiningDate);

//     return this.http.get(this.scriptUrl, { params });
//   }
//  submitEnquiry(formData: any): Observable<any> {
//     const url = `${this.scriptUrl}?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&mobile=${encodeURIComponent(formData.mobile)}&courses=${encodeURIComponent(JSON.stringify(formData.courses))}&address=${encodeURIComponent(formData.address)}&joiningDate=${encodeURIComponent(formData.joiningDate)}`;
    
//     return this.http.jsonp(url, 'callback').pipe(
//       map(response => response)
//     );
// }
}