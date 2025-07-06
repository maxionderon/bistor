import { Component } from '@angular/core';
import { Result } from '../../model/result';
import { LimitsComponent } from "../limits-components/limits/limits.component";
import { SpreadsheetComponent } from "../spreadsheet-components/spreadsheet/spreadsheet.component";

@Component({
  selector: 'app-bistor',
  imports: [LimitsComponent, SpreadsheetComponent],
  templateUrl: './bistor.component.html',
  styleUrl: './bistor.component.css'
})
export class BistorComponent {

  results: Array<Result>;

  constructor() {

    this.results = new Array<Result>();

  }

  protected resultsCalculated(results: Array<Result>) {

    this.results = results;

  }

}
