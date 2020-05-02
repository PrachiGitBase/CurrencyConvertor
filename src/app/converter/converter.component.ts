import { Component, OnInit,  Input,Output,EventEmitter} from '@angular/core';
import{FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {CurrencyConversionApiService} from '../currency-conversion-api.service'
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent  implements OnInit {
  
    @Input()  convertYenToDollar: number;
    @Output() keyUpClick = new EventEmitter();
    @Input()  convertDollarToYen: number;
    @Output() onChange = new EventEmitter();
    showErrorDiv : boolean;
    CurrencyArr : any;
    CurrencyFormGroup:FormGroup;
    CurrencyToGroup:FormGroup;
    newCurrencyCodeArr :any;
    res:any;
    constructor(private fb:FormBuilder, private currencyService:CurrencyConversionApiService) {}
     
    ngOnInit(){
      this.showErrorDiv = false;
      this.newCurrencyCodeArr =[];
      //this.CurrencyArr =[{id:1,Currency:"YEN"},{id:2,Currency:"INDIA"},
      //{id:3,Currency:"EURO"},{id:4,Currency:"USD"},{id:5,Currency:"CHN"}]
      this.CurrencyFormGroup = this.fb.group({
        currencyControl:['India']
      });

      this.CurrencyToGroup = this.fb.group({
        currencyToControl:['India']
      });
     
      this.getAllCurrenciesVal();
    }
    
    convertToUsd(event:any) {
        this.keyUpClick.emit(event.target.value);
       }
  
     hideDangerDiv(){
      this.showErrorDiv = false;
    }

    convertToYen(event:any) {
      
        this.onChange.emit(event.target.value);
      }
  
     getAllCurrenciesVal(){
       debugger;
       this.currencyService.getCurrencyCode().subscribe((data)=>{
        var obj=data.results;
        //var result =Object.keys(obj).map(e=>obj[e]);
         console.log(obj);
             for (const key in obj) {
            let value = obj[key];
            
            //optional check for properties from prototype chain
            if (obj.hasOwnProperty(key)) {
              //this.newCurrencyCodeArr.push(key);
              this.res = key;
              
            }else{
              //property from protytpe chain
            }
            this.CurrencyArr.push(this.res);
            this.newCurrencyCodeArr.push(this.res);
          }
        console.log(this.newCurrencyCodeArr);
        console.log( this.CurrencyArr);
      
       })
       // this.newCurrencyCodeArr
      }
  }
  
