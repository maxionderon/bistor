import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ResultComponent } from "../result/result.component";
import { Result } from '../../../model/result';
import { ItemType } from '../../../model/itemType';
import { Constants } from '../../../model/constants';
import { Modifiers } from '../../../model/modifiers';
import { PaginationComponent } from "../pagination/pagination.component";
import { SelectHeaderComponent } from "../select-header/select-header.component";
import { IconService } from '../../../services/iconService/icon.service';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { SortState } from '../../../model/sort-state';

@Component({
  selector: 'app-table',
  imports: [ResultComponent, PaginationComponent, SelectHeaderComponent, FaIconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges {

  @Input("Results")
  results: Array<Result>;
  @Input("Modifiers")
  modifiers: Modifiers;

  protected showResults: Array<Result>;

  protected necessaryItemTypes: Array<ItemType>;
  protected selectedItemTypes: Array<ItemType>;

  protected paginationIsNecessary: boolean;

  private iconService: IconService;

  private sortStates: Map<ItemType, SortState>;

  constructor() {

    this.results = new Array<Result>();
    this.modifiers = new Modifiers();
    this.necessaryItemTypes = new Array<ItemType>();
    this.selectedItemTypes = new Array<ItemType>();
    this.showResults = new Array<Result>();
    this.paginationIsNecessary = false;
    this.iconService = new IconService();
    this.sortStates = new Map<ItemType, SortState>();

  }

  ngOnInit(): void {

    this.necessaryItemTypes = this.calculateNecessaryItemTypes();
    this.initializeSortStates();
    this.selectedItemTypes = this.necessaryItemTypes.concat([]);
    this.showResults = this.results.concat([]);
    if( this.results.length > 10 ) {
      this.paginationIsNecessary = true;
    } else {
      this.paginationIsNecessary = false;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
      
    this.necessaryItemTypes = this.calculateNecessaryItemTypes();
    this.initializeSortStates();
    this.selectedItemTypes = this.necessaryItemTypes.concat([]);
    this.showResults = this.results.concat([]);
    if( this.results.length > 10 ) {
      this.paginationIsNecessary = true;
    } else {
      this.paginationIsNecessary = false;
    }

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

  protected getPercent(result: Result, itemType: ItemType): string {

    return Constants.getPercent(result.getValue(itemType), itemType, this.modifiers.getModifier(itemType) as number).toFixed(2) + " %";

  }

  protected getRating(result: Result, itemType: ItemType): string {

    return String( Constants.getRating(Constants.getPercent(result.getValue(itemType), itemType, this.modifiers.getModifier(itemType) as number), itemType, this.modifiers.getModifier(itemType) as number));

  }

  protected sortByHeader(itemType: ItemType) {

    this.showResults.sort( (a, b) => {

      return a.getValue(itemType) - b.getValue(itemType);

    });

  }

  protected changedItemType(changedItemType: ItemType, index: number): void {

    this.selectedItemTypes.splice(index, 1, changedItemType);

  }

  protected getIcon(itemType: ItemType): IconDefinition {

    if( (this.sortStates.get(itemType) as SortState).ascending ) {

      return this,this.iconService.iconSortUp;

    }

    if( (this.sortStates.get(itemType) as SortState).descending ) {

      return this,this.iconService.iconSortDown;

    }

    return this.iconService.iconSort;

  }

  protected sort(itemType: ItemType): void {

    if( (this.sortStates.get(itemType) as SortState).ascending ) {

      this.sortDescending(itemType);
      this.setSortState(itemType, false, true);

    } else  if( (this.sortStates.get(itemType) as SortState).descending ) {

      this.sortAscending(itemType);
      this.setSortState(itemType, true, false);

    } else {

      this.sortAscending(itemType);
      this.setSortState(itemType, true, false);

    }

  }

  private sortAscending(itemType: ItemType): void {

    this.showResults.sort( (a: Result, b: Result) => {

      return a.getValue(itemType) - b.getValue(itemType);

    });

  }

  private sortDescending(itemType: ItemType): void {

    this.showResults.sort( (a: Result, b: Result) => {

      return b.getValue(itemType) - a.getValue(itemType);

    });

  }

  private initializeSortStates(): void {

    for(const itemType of this.necessaryItemTypes) {

      this.sortStates.set(itemType, new SortState());

    }

  }

  private setSortState(itemType: ItemType, ascending: boolean, descending: boolean): void {

    this.sortStates.forEach( (sortState: SortState, itemType: ItemType) => {

      sortState.ascending = false;
      sortState.descending = false;

      this.sortStates.set( itemType, sortState);

    });

    const sortState: SortState = this.sortStates.get(itemType) as SortState;

    sortState.ascending = ascending;
    sortState.descending = descending;

    this.sortStates.set(itemType, sortState);

  }
  
}