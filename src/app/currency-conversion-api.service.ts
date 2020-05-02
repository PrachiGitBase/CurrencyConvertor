import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionApiService  {

  url = "https://free.currconv.com/api/v7/currencies?apiKey&apiKey=6636e33d1659c854ac5c";
  constructor(private http: HttpClient) { }

  getCurrencyCode(){
    debugger;
    return this.http.get(this.url);
  }
}
