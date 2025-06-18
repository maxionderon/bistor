import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../model/result';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';

import { Augment } from '../../model/augment';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faUserGear, faUserPlus, faStar, faSyringe } from '@fortawesome/free-solid-svg-icons'
import { Item2Component } from "../item2/item2.component";

@Component({
  selector: 'app-result',
  imports: [FontAwesomeModule, Item2Component],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  @Input()
  result: Result | undefined;

  numberOfEnhancementsByType: Map<ItemType, number>;
  numberOfAugmentsByType: Map<ItemType, number>;
  numberOfSetBonusByType: Map<ItemType, number>;
  itemTypesOfEnhancements: Array<ItemType>;
  itemTypesOfAugments: Array<ItemType>;
  itemTypesOfSetBonus: Array<ItemType>;

  iconEnhancements: IconDefinition;
  iconAugments: IconDefinition;
  iconSetBonus: IconDefinition;
  iconStim: IconDefinition;

  withSetBonus: boolean;
  withStim: boolean;

  constructor() {

    this.numberOfEnhancementsByType = new Map<ItemType, number>;
    this.numberOfAugmentsByType = new Map<ItemType, number>;
    this.numberOfSetBonusByType = new Map<ItemType, number>;
    this.itemTypesOfEnhancements = new Array<ItemType>;
    this.itemTypesOfAugments = new Array<ItemType>;
    this.itemTypesOfSetBonus = new Array<ItemType>;

    this.iconEnhancements = faUserGear;
    this.iconAugments = faUserPlus;
    this.iconSetBonus = faStar;
    this.iconStim = faSyringe;

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

  getNumberOfEnhancements(itemType: ItemType): number {

    if( this.numberOfEnhancementsByType.has(itemType) ) {

      return this.numberOfEnhancementsByType.get(itemType) as number;


    } else {

      return 0;

    }

  }

  getNumberOfAugments(itemType: ItemType): number {

    if( this.numberOfAugmentsByType.has(itemType) )  {
      
      return this.numberOfAugmentsByType.get(itemType) as number;

    } else {

      return 0;

    }

  }

  getNumberOfSetBonus(itemType: ItemType): number {

    if( this.numberOfSetBonusByType.has(itemType) ) {

      return this.numberOfSetBonusByType.get(itemType) as number;

    } else {

      return 0;

    }

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
