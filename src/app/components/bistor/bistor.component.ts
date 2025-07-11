import { Component } from '@angular/core';
import { Result } from '../../model/result';
import { LimitsComponent } from "../limits-components/limits/limits.component";
import { SpreadsheetComponent } from "../spreadsheet-components/spreadsheet/spreadsheet.component";
import { TableComponent } from "../table-components/table/table.component";
import { Modifiers } from '../../model/modifiers';

@Component({
  selector: 'app-bistor',
  imports: [LimitsComponent, SpreadsheetComponent, TableComponent],
  templateUrl: './bistor.component.html',
  styleUrl: './bistor.component.css'
})
export class BistorComponent {

  results: Array<Result>;
  modifiers: Modifiers;
  limitedResults: Array<Result>;

  protected calculated: boolean;

  constructor() {

    this.results = new Array<Result>();
    this.modifiers = new Modifiers();
    this.limitedResults = new Array<Result>();
    this.calculated = false;

  }

  protected resultsCalculated(results: Array<Result>) {

    this.results = results;
    this.calculated = true;

  }

  protected receiveModifiers(modifiers: Modifiers) {

    this.modifiers = modifiers;

  }

  protected showLimitedResults(limitedResults: Array<Result>) {

    this.limitedResults = limitedResults;

  }

}
