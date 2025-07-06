import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Result } from '../../../model/result';
import { ItemType } from '../../../model/itemType';
import { IconService } from '../../../services/iconService/icon.service';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { ChoseLimitComponent } from "../chose-limit/chose-limit.component";

@Component({
  selector: 'app-limits',
  imports: [FaIconComponent, ChoseLimitComponent],
  templateUrl: './limits.component.html',
  styleUrl: './limits.component.css'
})
export class LimitsComponent implements OnInit, OnChanges {

  @Input("results")
  results: Array<Result>;
  protected maximum: Map<ItemType, number>;
  protected minimum: Map<ItemType, number>;
  protected itemTypes: Array<ItemType>;

  protected iconService: IconService;

  protected limitsSelected: boolean;
  protected iconIsExpanded: IconDefinition;
  protected isExpanded: boolean;

  constructor() {

    this.results = new Array<Result>();
    this.maximum = new Map<ItemType, number>(); 
    this.minimum = new Map<ItemType, number>();
    this.itemTypes = new Array<ItemType>();
    this.iconService = new IconService();
    this.limitsSelected = false;
    this.iconIsExpanded = this.iconService.iconWarning;
    this.isExpanded = false;

  }

  ngOnInit(): void {

    this.calculateMinimumAndMaximum();
    this.itemTypes = Array.from(this.maximum.keys());

  }

  ngOnChanges(): void {
    
    this.calculateMinimumAndMaximum();
    this.itemTypes = Array.from(this.maximum.keys());
    if( this.itemTypes.length != 0 ) {

      this.isExpanded = true;
      this.iconIsExpanded = this.iconService.iconShowLess;

    }

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

        if( this.minimum.has(itemType) == true ) {

          if( this.minimum.get(itemType) as number > value ) {

            this.minimum.set(itemType, value);

          }

        } else {

          this.minimum.set(itemType, value);

        }

      });

    });

  }

  protected getMinimum(itemType: ItemType): number {

    if( this.minimum.has(itemType) ) {

      return this.minimum.get(itemType) as number;

    }

    return 0;

  }

  protected getMaximum(itemType: ItemType): number {

    if( this.maximum.has(itemType) ) {

      return this.maximum.get(itemType) as number;

    }

    return 0;

  }
  
}
