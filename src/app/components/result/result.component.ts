import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../model/result';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';
import { CommonModule } from '@angular/common';
import { Augment } from '../../model/augment';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  @Input()
  result: Result | undefined;

  numberOfEnhancementsByType: Map<ItemType, number>;
  numberOfAugmentsByType: Map<ItemType, number>;
  itemTypes: Array<ItemType>;

  constructor() {

    this.numberOfEnhancementsByType = new Map<ItemType, number>;
    this.numberOfAugmentsByType = new Map<ItemType, number>;
    this.itemTypes = new Array<ItemType>;

  }

  ngOnInit(): void {

    this.calculateNumberOfEnhancementsByType();
    this.calculateNumberOfAugmentsByType();
    this.itemTypes = this.getItemTypes();
      
  }

  private calculateNumberOfEnhancementsByType() {

    this.result?.enhancements.forEach( (enhancement: Enhancement) => {

      if( this.numberOfEnhancementsByType.has(enhancement.itemType) ) {

        this.numberOfEnhancementsByType.set(enhancement.itemType, (this.numberOfEnhancementsByType.get(enhancement.itemType) as number) + 1);

      } else {

        this.numberOfEnhancementsByType.set(enhancement.itemType, 1);

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

  getNumberOfEnhancements(itemType: ItemType): string {

    return String(this.numberOfEnhancementsByType.get(itemType));

  }

  getNumberOfAugments(itemType: ItemType): string {

    return String(this.numberOfAugmentsByType.get(itemType));

  }

  getItemTypes(): Array<ItemType> {

    return Array.from(this.numberOfEnhancementsByType.keys());

  }

}
