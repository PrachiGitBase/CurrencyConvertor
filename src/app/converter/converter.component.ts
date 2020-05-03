import { Component, OnInit,  Input,Output,EventEmitter, ViewChild, ElementRef,AfterViewInit} from '@angular/core';
import{FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {CurrencyConversionApiService} from '../currency-conversion-api.service'
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent  implements OnInit{
  
    @Input()  convertYenToDollar: number;
    @Output() keyUpClick = new EventEmitter();
    @Input()  convertDollarToYen: number;
    @Output() onChange = new EventEmitter();
    showErrorDiv : boolean;
    CurrencyArr : any;
    CurrencyFormGroup:FormGroup;
    CurrencyToGroup:FormGroup;
    newCurrencyCodeArr :any;
    selectedFromVal: any;
    fromInputBoxVal:any;
    selectedToVal:any;
    toInputBoxVal:any;
    codeOfFromCurrency:String;
    codeOfToCurrency:String;
    fromToConversion:any;
    toFromConversion:any;
    convertCurrencyValFromTo:any;
    convertCurrencyValToFrom:any;
    newCurrencyRate:any;
    @ViewChild('changeTheText')
    changeTheText:ElementRef;
    showAnotherDiv:boolean;
    changeFromInputVal:boolean;
    constructor(private fb:FormBuilder, private currencyService:CurrencyConversionApiService) {}
     
    ngOnInit(){
      this.newCurrencyCodeArr =[];
    //Form Group defination for from Div
      this.CurrencyFormGroup = this.fb.group({
        currencyControl:[''],
        fromCurrencyVal:[''],
      });
      this.CurrencyToGroup = this.fb.group({
        currencyToControl:[''],
        toCurrencyVal:[''],
      });
     
      this.getAllCurrenciesVal();
      this.showErrorDiv = false;
      this.showAnotherDiv =false;
      this.changeFromInputVal=false;
    }

 // Function for showing the converted currency value from From select box input to To select box input    
    convertFromToCurrency(event:any) {
        this.getCurrencyCodeAndInputVal();
       }

// Function for showing the converted currency value from To select box input to From select box input 
    convertToFromCurrency(event:any) {
      this.getCurrencyCodeAndInputVal();
    }

// hiding the error div on click of cross button
      hideDangerDiv(){
        this.showErrorDiv = false;
        this.showAnotherDiv=false;
      }
  // Function for showing From and To Dropdowns
     getAllCurrenciesVal(){
       
       this.currencyService.getCurrencyCode().subscribe((data:any)=>{
          for (const key in data.results) {
            var t = key +" - "+ data.results[key].currencyName;
            this.newCurrencyCodeArr.push(t);
          }
      
       })
      }

      //function for getting the currency conversion rate for particular country code
      getCurrencyCodeAndInputVal(){
        debugger;
        this.newCurrencyRate =[];
        this.selectedFromVal =this.CurrencyFormGroup.controls['currencyControl'].value;
        this.codeOfFromCurrency = this.selectedFromVal.split(" - ");
        this.selectedToVal = this.CurrencyToGroup.controls['currencyToControl'].value;
        this.codeOfToCurrency = this.selectedToVal.split(" - ");
        if((this.selectedFromVal !="" ) && (this.selectedToVal != "" )){
          return this.getConversionRateUrlCall(this.codeOfFromCurrency[0],this.codeOfToCurrency[0]);
        }
        else{
         return this.showErrorDiv = true;
        }
        
    }
//Conversion rate url call
    getConversionRateUrlCall(fromSelectVal,ToSelectVal){
      debugger;
      this.currencyService.getCurrencyRateVal(fromSelectVal,ToSelectVal)
      .subscribe((data)=>{
        this.newCurrencyRate = data;
      });
      return this.newCurrencyRate;
    }
// input change call
    convertToFromVal(){
      this.toInputBoxVal = this.CurrencyToGroup.controls['toCurrencyVal'].value;
      if((this.toInputBoxVal !="" && this.toInputBoxVal>=0 )){
        this.changeFromInputVal = false;
        return this.getCurrencyRateInObject(this.changeFromInputVal);
      }
      else{
        this.convertCurrencyValToFrom =0;
        return this.showAnotherDiv = true;
      }
    }
//input change call
    convertFromToVal(){
      this.fromInputBoxVal = this.CurrencyFormGroup.controls['fromCurrencyVal'].value;
      if((this.fromInputBoxVal!="" && this.fromInputBoxVal>=0)){
          this.changeFromInputVal = true;
         return  this.getCurrencyRateInObject(this.changeFromInputVal);
      }
      else{
        this.convertCurrencyValFromTo =0;
        return this.showAnotherDiv = true;
      }
    }

  // get particular currency converter rate
    getCurrencyRateInObject(booleanInputVal){
      Object.entries(this.newCurrencyRate).forEach((entry,i )=> {
        let value = entry[1];
        this.fromToConversion =  (i===0)?value: this.fromToConversion;
        this.toFromConversion =  (i===1)?value:  this.toFromConversion ;
      });
      if(booleanInputVal == true){
        this.convertCurrencyValFromTo =this.fromInputBoxVal * this.fromToConversion;
        this.CurrencyToGroup.controls['toCurrencyVal'].patchValue=(this.convertCurrencyValFromTo);
      }
      else{
        this.convertCurrencyValToFrom =this.toInputBoxVal * this.toFromConversion;
        this.CurrencyFormGroup.controls['fromCurrencyVal'].patchValue = this.convertCurrencyValToFrom;
      }

      return this.convertCurrencyValFromTo ,this.convertCurrencyValToFrom;
    }
  }
  
