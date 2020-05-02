import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CurrencyConverterProject';

  yenValue : number;
  dolValue:number;
  public yenToDollar :number;
  public dolToYen:number;
  convertYenToDollar : number;
  convertDollarToYen : number;

childEventClicked(event: number) {
  this.yenValue = event;
  this.yenToDollar = this.yenValue *0.0089;
  this.convertYenToDollar = this.yenToDollar
  return  this.convertYenToDollar ;
}

dolToYenConvertEvent(event: number) {
  this.dolValue = event;
  this.dolToYen =  this.dolValue  *112.36;
  this.convertDollarToYen =  this.dolToYen
  return this.convertDollarToYen;
}

}