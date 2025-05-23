import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../model/result';
import { ItemType } from '../../model/itemType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input()
  results: Array<Result>;

  necessaryItemTypes: Array<ItemType>;


  constructor() {

    this.results = new Array<Result>
    this.necessaryItemTypes = new Array<ItemType>;

  }

  ngOnInit(): void {

    this.necessaryItemTypes = this.calculateNecessaryItemTypes();
          
  }

  private calculateNecessaryItemTypes(): Array<ItemType> {

    let itemTypes: Set<ItemType> = new Set<ItemType>;

    this.results.forEach( (result: Result) => {

      Array.from(result.values.keys()).forEach( (itemType: ItemType) => {

        itemTypes.add(itemType);

      });

    });

    this.necessaryItemTypes = Array.from(itemTypes);

    return this.necessaryItemTypes;

  }

}
