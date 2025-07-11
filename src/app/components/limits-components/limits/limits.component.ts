import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Result } from '../../../model/result';
import { ItemType } from '../../../model/itemType';
import { IconService } from '../../../services/iconService/icon.service';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { ChoseLimitComponent } from "../chose-limit/chose-limit.component";
import { Limit } from '../../../model/limit';
import { Modifiers } from '../../../model/modifiers';

@Component({
  selector: 'app-limits',
  imports: [FaIconComponent, ChoseLimitComponent],
  templateUrl: './limits.component.html',
  styleUrl: './limits.component.css'
})
export class LimitsComponent implements OnInit, OnChanges {

  @Input("Results")
  results: Array<Result>;
  @Input("Modifiers")
  modifiers: Modifiers;
  protected maximum: Map<ItemType, number>;
  //protected minimum: Map<ItemType, number>;
  protected itemTypes: Array<ItemType>;

  protected iconService: IconService;

  protected limitsSelected: boolean;
  protected iconIsExpanded: IconDefinition;
  protected isExpanded: boolean;

  private limits: Map<ItemType, Limit>;

  protected showTablePossible: boolean;

  protected limitedResults: Array<Result>;
 
  @Output("limitedResults")
  private eventEmitter: EventEmitter<Array<Result>>;

  constructor() {

    this.results = new Array<Result>();
    this.modifiers = new Modifiers();
    this.maximum = new Map<ItemType, number>(); 
    //this.minimum = new Map<ItemType, number>();
    this.itemTypes = new Array<ItemType>();
    this.iconService = new IconService();
    this.limitsSelected = false;
    this.iconIsExpanded = this.iconService.iconWarning;
    this.isExpanded = false;

    this.limits = new Map<ItemType, Limit>();

    this.showTablePossible = true;

    this.limitedResults = new Array<Result>();
    
    this.eventEmitter = new EventEmitter<Array<Result>>();

  }

  ngOnInit(): void {

    this.calculateMinimumAndMaximum();
    this.itemTypes = Array.from(this.maximum.keys());
    this.limitedResults = this.results.concat([]);
     
  }

  ngOnChanges(): void {
    
    this.calculateMinimumAndMaximum();
    this.itemTypes = Array.from(this.maximum.keys());
    if( this.itemTypes.length != 0 ) {

      this.isExpanded = true;
      this.iconIsExpanded = this.iconService.iconShowLess;

    }

    this.limitedResults = this.calculateLimitedResults();
        
  }
 
  protected expand(): void {
    
    if( this.itemTypes.length != 0 ) {

      this.isExpanded = !this.isExpanded;

      if( this.isExpanded == true ) {

        this.iconIsExpanded = this.iconService.iconShowLess;

      } else {

        this.iconIsExpanded = this.iconService.iconShowMore;

      }

    }

  }

  private calculateMinimumAndMaximum(): void {

    this.results.forEach( (result: Result) => {

      result.getValues().forEach( (value: number, itemType: ItemType) => {

        if( this.maximum.has(itemType) == true ) {

          if( this.maximum.get(itemType) as number < value ) {

            this.maximum.set(itemType, value);

          }

        } else {

          this.maximum.set(itemType, value);

        }

      });

    });

  }

  protected getMinimum(itemType: ItemType): number {

    return 0;

  }

  protected getMaximum(itemType: ItemType): number {

    if( this.maximum.has(itemType) ) {

      return this.maximum.get(itemType) as number;

    }

    return 0;

  }

  protected showTable(): void {

    this.eventEmitter.emit(this.limitedResults);
    this.limitsSelected = true;
    this.expand();

  }

  protected absorbLimit(limit: Limit): void {

    this.limits.set(limit.itemType, limit);

    if( this.limitsAreLegit() == true ) {

      this.limitedResults = this.calculateLimitedResults();
      this.showTablePossible = true;

    } else {

      this.showTablePossible = false;

    }
    
  }
  
  private calculateLimitedResults(): Array<Result> {

    let limitedResults: Array<Result> = this.results.concat([]);
    let tempResults: Array<Result> = new Array<Result>();

    this.limits.forEach( (limit: Limit, itemType: ItemType) => {
      
      for(const result of limitedResults) {

        if( result.getValue(itemType) >= limit.minimum && result.getValue(itemType) <= limit.maximum ) {

          tempResults.push(result);

        }

      }

      limitedResults = tempResults.concat([]);
      tempResults = new Array<Result>();

    });

    return limitedResults;

  }

  private limitsAreLegit(): boolean {

    let isLegit: boolean = true;

    this.limits.forEach( (limit: Limit, itemType: ItemType ) => {

      if( limit.possible == false ) {

        isLegit = false;

      }

    });

    return isLegit;

  }
  
}