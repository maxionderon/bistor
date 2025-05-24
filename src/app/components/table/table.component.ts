import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../model/result';
import { ItemType } from '../../model/itemType';
import { CommonModule } from '@angular/common';
import { ResultComponent } from "../result/result.component";

@Component({
  selector: 'app-table',
  imports: [CommonModule, ResultComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input()
  results: Array<Result>;

  showResults: Array<Result>;

  necessaryItemTypes: Array<ItemType>;


  constructor() {

    this.results = new Array<Result>
    this.necessaryItemTypes = new Array<ItemType>;
    this.showResults = new Array<Result>

  }

  ngOnInit(): void {

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

  sortByHeader(itemType: ItemType) {

    this.showResults.sort( (a, b) => {

      return a.getValue(itemType) - b.getValue(itemType);

    });

  }

}
