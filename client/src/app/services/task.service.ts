import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
//import {Observable} from 'rxjs';
//import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:Http) {
    console.log('Task Service Initilized...');
   }

   getTasks(){
    return this.http.get("/api/tasks").pipe(map(response => response.json()));
   }

   addTask(newTask){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/api/tasks",JSON.stringify(newTask), {headers: headers})
      .pipe(map(response => response.json()));
   }

   deleteTask(id){
     return this.http.delete("/api/tasks/" + id)
     .pipe(map(response => response.json()));
   }

   updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("/api/tasks/"+task._id, JSON.stringify(task), {headers: headers})
      .pipe(map(response => response.json()));    
   }
}
