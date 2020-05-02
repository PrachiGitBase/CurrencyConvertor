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
    constructor(private fb:FormBuilder, private currencyService:CurrencyConversionApiService) {}
     
    ngOnInit(){
      this.newCurrencyCodeArr =[];
      this.CurrencyFormGroup = this.fb.group({
        currencyControl:[""],
        fromCurrencyVal:"",
      });

      this.CurrencyToGroup = this.fb.group({
        currencyToControl:[""],
        toCurrencyVal:"",
      });
     
      this.getAllCurrenciesVal();

      console.log(this.newCurrencyCodeArr);
      this.showErrorDiv = false;
    }
    
    convertFromToCurrency(event:any) {
        //this.keyUpClick.emit(event.target.value);
        debugger;
        this.selectedFromVal =this.CurrencyFormGroup.controls['currencyControl'].value;
        this.fromInputBoxVal = this.CurrencyFormGroup.controls['fromCurrencyVal'].value;
        this.codeOfFromCurrency = this.selectedFromVal.split(" - ");
       
        this.selectedToVal = this.CurrencyToGroup.controls['currencyToControl'].value;
        this.codeOfToCurrency = this.selectedToVal.split(" - ");
        if((this.selectedFromVal == "" || this.selectedFromVal== null || 
          this.selectedFromVal == undefined) && (this.selectedToVal == "" ||
           this.selectedToVal== null || this.selectedToVal == undefined)){
            this.showErrorDiv = true;
            return null;
          }
          else{
        this.currencyService.getCurrencyRateVal(this.codeOfFromCurrency[0],this.codeOfToCurrency[0])
        .subscribe((data)=>{
          console.log(data);
          var newCurrencyRate=[];


          Object.entries(data).forEach((entry,i )=> {
            let value = entry[1];
            this.fromToConversion =  (i===0)?value: this.fromToConversion;
            this.toFromConversion =  (i===1)?value:  this.toFromConversion ;
          });

        
          this.convertCurrencyValFromTo =this.fromInputBoxVal * this.fromToConversion;
          this.CurrencyToGroup.controls['currencyToControl'].setValue = this.convertCurrencyValFromTo;
        })
      }
    }
  

    convertToFromCurrency(event:any) {
      //this.keyUpClick.emit(event.target.value);
      debugger;
      this.selectedFromVal =this.CurrencyFormGroup.controls['currencyControl'].value;
      this.fromInputBoxVal = this.CurrencyFormGroup.controls['fromCurrencyVal'].value;
      this.codeOfFromCurrency = this.selectedFromVal.split(" - ");
      this.selectedToVal = this.CurrencyToGroup.controls['currencyToControl'].value;
      this.codeOfToCurrency = this.selectedToVal.split(" - ");
      this.toInputBoxVal = this.CurrencyToGroup.controls['toCurrencyVal'].value;
      if((this.selectedFromVal == "" || this.selectedFromVal== null || 
        this.selectedFromVal == undefined) && (this.selectedToVal == "" ||
         this.selectedToVal== null || this.selectedToVal == undefined)){
          this.showErrorDiv = true;
          return null;
        }
        else{
      this.currencyService.getCurrencyRateVal(this.codeOfFromCurrency[0],this.codeOfToCurrency[0])
      .subscribe((data)=>{
       
        Object.entries(data).forEach((entry,i )=> {
          let value = entry[1];
          this.fromToConversion =  (i===0)?value: this.fromToConversion;
          this.toFromConversion =  (i===1)?value:  this.toFromConversion ;
        });
       
        this.convertCurrencyValToFrom =this.toInputBoxVal * this.toFromConversion;
        this.CurrencyToGroup.controls['toCurrencyVal'].setValue = this.convertCurrencyValFromTo;
      })
    }
  }

      hideDangerDiv(){
        this.showErrorDiv = false;
      }
  
     getAllCurrenciesVal(){
       
       this.currencyService.getCurrencyCode().subscribe((data)=>{
        var obj=data;
         console.log(obj);
          for (const key in obj.results) {
            var t = key +" - "+ obj.results[key].currencyName;
            this.newCurrencyCodeArr.push(t);
          }
      
       })
      }

     
  }
  
