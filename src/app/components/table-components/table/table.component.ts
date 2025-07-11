import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ResultComponent } from "../result/result.component";
import { Result } from '../../../model/result';
import { ItemType } from '../../../model/itemType';
import { Constants } from '../../../model/constants';
import { Modifiers } from '../../../model/modifiers';

@Component({
  selector: 'app-table',
  imports: [ResultComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges {

  @Input("Results")
  results: Array<Result>;
  @Input("Modifiers")
  modifiers: Modifiers;

  showResults: Array<Result>;

  necessaryItemTypes: Array<ItemType>;


  constructor() {

    this.results = new Array<Result>
    this.modifiers = new Modifiers();
    this.necessaryItemTypes = new Array<ItemType>;
    this.showResults = new Array<Result>

  }

  ngOnInit(): void {

    this.necessaryItemTypes = this.calculateNecessaryItemTypes();
    this.showResults = this.results.concat([]);
          
  }

  ngOnChanges(changes: SimpleChanges): void {
      
    this.necessaryItemTypes = this.calculateNecessaryItemTypes();
    this.showResults = this.results.concat([]);


  }

  private calculateNecessaryItemTypes(): Array<ItemType> {

    let itemTypes: Set<ItemType> = new Set<ItemType>;

    this.results.forEach( (result: Result) => {

      if( result.values.size == 0) {

        result.getValues();

      }

      Array.from(result.values.keys()).forEach( (itemType: ItemType) => {

        itemTypes.add(itemType);

      });

    });

    this.necessaryItemTypes = Array.from(itemTypes);

    return this.necessaryItemTypes;

  }

  getPercent(result: Result, itemType: ItemType): string {

    return Constants.getPercent(result.getValue(itemType), itemType, this.modifiers.getModifier(itemType) as number).toFixed(2) + " %";
    //return String(result.getPercent(itemType).toFixed(2)) + " %";

  }

  getRating(result: Result, itemType: ItemType): string {

    return String( Constants.getRating(Constants.getPercent(result.getValue(itemType), itemType, this.modifiers.getModifier(itemType) as number), itemType, this.modifiers.getModifier(itemType) as number));

  }

  sortByHeader(itemType: ItemType) {

    this.showResults.sort( (a, b) => {

      return a.getValue(itemType) - b.getValue(itemType);

    });

  }

}
