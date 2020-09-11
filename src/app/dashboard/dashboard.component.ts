import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  devp_name= "Arvind kumar Gupta"
  filteredItems : any;
  launch_success = false;
  land_success = false;
  url = 'https://api.spacexdata.com/v3/launches?limit=100';
  filterUrl = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=';
  years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.getdetails(); 
  }
  getdetails():void{
    this.alluserService().subscribe(
      restItems => {
        this.filteredItems = (restItems);
        console.log(restItems);
      }
    )
  }
  filter_method(year){
     this.filterByYear(year).subscribe(
       result =>{
        this.filteredItems = result;
        console.log(result);
       }
     )
  }
  filter_all(val1,val2){
    this.filterRecord(val1, val2).subscribe(
      result =>{
           this.filteredItems = result;
           console.log(result);
      }
    )
  }
  alluserService() {
    return this.http.get<any[]>(this.url).pipe(map(data => data));
  }
  filterByYear(year){
     return this.http.get<any[]>(this.filterUrl + year).pipe(map(data => data));
  }
  filterRecord(launch_success,land_success){
     return this.http.get<any[]>(this.url + '&launch_success=' + launch_success + '&land_success=' + land_success).pipe(map(data => data));
  }
}