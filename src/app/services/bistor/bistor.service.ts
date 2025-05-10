import { Injectable } from '@angular/core';
import { ItemType } from '../../model/itemType';

@Injectable({
  providedIn: 'root'
})
export class BistorService {

  itemRatingEnhancements: Array<number>;
  itemRatingAugment: Array<number>;
  enhancementsItemTypes: Array<ItemType>;

  constructor() { 

    this.itemRatingEnhancements = new Array<number>;

    this.itemRatingEnhancements.push(328);
    this.itemRatingEnhancements.push(330);
    this.itemRatingEnhancements.push(332);
    this.itemRatingEnhancements.push(336);
    this.itemRatingEnhancements.push(340);
    this.itemRatingEnhancements.push(342);
    this.itemRatingEnhancements.push(344);

    this.itemRatingAugment = new Array<number>;

    this.itemRatingAugment.push(276);
    this.itemRatingAugment.push(286);
    this.itemRatingAugment.push(296);
    this.itemRatingAugment.push(300);
    this.itemRatingAugment.push(302);
    this.itemRatingAugment.push(310);
    this.itemRatingAugment.push(318);

    this.enhancementsItemTypes = new Array<ItemType>

    this.enhancementsItemTypes.push(ItemType.absorb);
    this.enhancementsItemTypes.push(ItemType.accuracy);
    this.enhancementsItemTypes.push(ItemType.alacrity);
    this.enhancementsItemTypes.push(ItemType.critical);
    this.enhancementsItemTypes.push(ItemType.shield);
    
    

  }
}
