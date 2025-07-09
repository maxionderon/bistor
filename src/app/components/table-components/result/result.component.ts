import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item2Component } from '../item2/item2.component';
import { Result } from '../../../model/result';
import { ItemType } from '../../../model/itemType';
import { Enhancement } from '../../../model/enhancement';
import { Augment } from '../../../model/augment';
import { StimComponent } from "../stim/stim.component";
import { Stim } from '../../../model/stim';
import { IconService } from '../../../services/iconService/icon.service';

@Component({
  selector: 'app-result',
  imports: [FontAwesomeModule, Item2Component, StimComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  @Input()
  result: Result | undefined;

  protected iconService: IconService;

  protected numberOfEnhancementsByType: Map<ItemType, number>;
  protected numberOfAugmentsByType: Map<ItemType, number>;
  protected numberOfSetBonusByType: Map<ItemType, number>;
  protected itemTypesOfEnhancements: Array<ItemType>;
  protected itemTypesOfAugments: Array<ItemType>;
  protected itemTypesOfSetBonus: Array<ItemType>;
  
  protected withSetBonus: boolean;
  protected withStim: boolean;

  constructor() {

    this.iconService = new IconService();

    this.numberOfEnhancementsByType = new Map<ItemType, number>;
    this.numberOfAugmentsByType = new Map<ItemType, number>;
    this.numberOfSetBonusByType = new Map<ItemType, number>;
    this.itemTypesOfEnhancements = new Array<ItemType>;
    this.itemTypesOfAugments = new Array<ItemType>;
    this.itemTypesOfSetBonus = new Array<ItemType>;
    
    this.withSetBonus = false;
    this.withStim = false;

  }

  ngOnInit(): void {

    this.calculateNumberOfEnhancementsByType();
    this.calculateNumberOfAugmentsByType();
    this.itemTypesOfEnhancements = this.getItemTypes(this.numberOfEnhancementsByType);
    this.itemTypesOfAugments = this.getItemTypes(this.numberOfAugmentsByType);
    this.itemTypesOfSetBonus = this.getItemTypes(this.numberOfSetBonusByType);
    
    this.setWithSetBonus();
    this.setWithStim();
          
  }

  private calculateNumberOfEnhancementsByType() {

    this.result?.enhancements.forEach( (enhancement: Enhancement) => {

      if( enhancement.setBonus == false ) {

        if( this.numberOfEnhancementsByType.has(enhancement.itemType) ) {

          this.numberOfEnhancementsByType.set(enhancement.itemType, (this.numberOfEnhancementsByType.get(enhancement.itemType) as number) + 1);

        } else {

          this.numberOfEnhancementsByType.set(enhancement.itemType, 1);

        }

      } else {

        if( this.numberOfSetBonusByType.has(enhancement.itemType) ) {

          this.numberOfSetBonusByType.set(enhancement.itemType, (this.numberOfSetBonusByType.get(enhancement.itemType) as number) + 1);

        } else {

          this.numberOfSetBonusByType.set(enhancement.itemType, 1);

        }

      }      

    });

  }

  private calculateNumberOfAugmentsByType() {

    this.result?.augments.forEach( (augment: Augment) => {

      if( this.numberOfAugmentsByType.has(augment.itemType) ) {

        this.numberOfAugmentsByType.set(augment.itemType, (this.numberOfAugmentsByType.get(augment.itemType) as number) + 1);

      } else {

        this.numberOfAugmentsByType.set(augment.itemType, 1);

      }

    });

  }

  protected getNumberOfEnhancements(itemType: ItemType): number {

    if( this.numberOfEnhancementsByType.has(itemType) ) {

      return this.numberOfEnhancementsByType.get(itemType) as number;


    } else {

      return 0;

    }

  }

  protected getNumberOfAugments(itemType: ItemType): number {

    if( this.numberOfAugmentsByType.has(itemType) )  {
      
      return this.numberOfAugmentsByType.get(itemType) as number;

    } else {

      return 0;

    }

  }

  protected getNumberOfSetBonus(itemType: ItemType): number {

    if( this.numberOfSetBonusByType.has(itemType) ) {

      return this.numberOfSetBonusByType.get(itemType) as number;

    } else {

      return 0;

    }

  }

  protected getStim(): Stim {

    return this.result?.stim as Stim;

  }

  protected getValueOfEnhancement(itemType: ItemType): string {

    let value: number = 0;

    this.result?.enhancements.forEach( (enhancement: Enhancement) => {

      if( enhancement.itemType == itemType && enhancement.setBonus == false ) {

        value = enhancement.tertiaryStat
        
      }

    });


    return String(value);

  }

  protected getValueOfSetBonus(itemType: ItemType): string {

    let value: number = 0;

    for(const enhancement of this.result?.enhancements as Array<Enhancement> ) {

      if( enhancement.setBonus == true && enhancement.itemType == itemType ) {

        value = enhancement.tertiaryStat;
        break;

      }

    }

    return String(value)

  }

  protected getValueOfAugment(itemType: ItemType): string {

    let value: number = 0;

    for(const augment of this.result?.augments as Array<Augment>) {

      if( augment.itemType == itemType ) {

        value = augment.tertiaryStat;
        break;

      }

    }

    return String(value);

  }

  private getItemTypes(items: Map<ItemType, number>): Array<ItemType> {

    return Array.from(items.keys());

  }

  private setWithStim(): void {

    if( this.result?.stim != undefined ) {

      this.withStim = true

    } else {

      this.withStim = false;

    }
        
  }

  private setWithSetBonus() {

    if( this.numberOfSetBonusByType.size != 0 ) {

      this.withSetBonus = true;

    } else {

      this.withSetBonus = false;

    }

  }

}
