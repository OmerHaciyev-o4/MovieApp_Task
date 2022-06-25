import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, tap } from "rxjs";
import { Category } from "../models/category";


@Injectable()
export class CategoryService{
    url="http://localhost:3000/categories";

    constructor(private http:HttpClient){

    }

    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.url);
    }

    createCategory(category: any): Observable<Category> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token' 
            })
        };

        return this.http.post<any>(this.url, category, httpOptions)
            .pipe(
                tap(data => {}),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //client or network
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }
}