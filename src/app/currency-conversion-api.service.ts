import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionApiService  {

  url = "https://free.currconv.com/api/v7/currencies?apiKey&apiKey=d9efc7b781eb314db78d";
 // currecnyrateUrl = "https://free.currconv.com/api/v7/convert?q=INR_USD&compact=ultra&apiKey=d9efc7b781eb314db78d"
  constructor(private http: HttpClient) { }

  getCurrencyCode(){

    return this.http.get(this.url);

  }

  getCurrencyRateVal(fromSelectedVal:String,ToSelectedVal:String){
    debugger;
    let concatStringFromTo = fromSelectedVal +"_"+ToSelectedVal;
    let concatStringToFrom = ToSelectedVal +"_"+fromSelectedVal;
    let queryString =concatStringFromTo +","+ concatStringToFrom;
    //console.log(concatString);
    
   return this.http.get("https://free.currconv.com/api/v7/convert?q="+queryString+"&compact=ultra&apiKey=d9efc7b781eb314db78d");
   
  }
}
