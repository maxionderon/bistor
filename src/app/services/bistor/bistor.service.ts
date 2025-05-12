import { Injectable } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root'
})
export class BistorService {
  
  enhancementsItemTypes: Array<ItemType>;
  enhancementsByItemRating: Map<number, Array<Enhancement>>;
  augmentsItemTypes: Array<ItemType>;
  augmentsByItemRating: Map<number, Array<Augment>>;
  itemRatingEnhancements: Array<number>;
  itemRatingAugments: Array<number>;
  
  constructor() { 
    
    this.enhancementsItemTypes = new Array<ItemType>

    this.enhancementsItemTypes.push(ItemType.absorb);
    this.enhancementsItemTypes.push(ItemType.accuracy);
    this.enhancementsItemTypes.push(ItemType.alacrity);
    this.enhancementsItemTypes.push(ItemType.critical);
    this.enhancementsItemTypes.push(ItemType.shield);

    this.enhancementsByItemRating = this.createAvailableEnhancements();
    
    this.augmentsItemTypes = new Array<ItemType>

    this.augmentsItemTypes.push(ItemType.absorb);
    this.augmentsItemTypes.push(ItemType.accuracy);
    this.augmentsItemTypes.push(ItemType.alacrity);
    this.augmentsItemTypes.push(ItemType.critical);
    this.augmentsItemTypes.push(ItemType.defense);
    this.augmentsItemTypes.push(ItemType.mastery);
    this.augmentsItemTypes.push(ItemType.shield);
    
    this.augmentsByItemRating = this.createAvailableAugments();

    this.itemRatingEnhancements = Array.from(this.enhancementsByItemRating.keys());
    this.itemRatingAugments = Array.from(this.augmentsByItemRating.keys());

  }

  private createAvailableEnhancements(): Map<number, Array<Enhancement>> {

    let enhancementsByItemRating: Map<number, Array<Enhancement>> = new Map<number, Array<Enhancement>>;
    
    enhancementsByItemRating.set(328, this.buildEnhancements(152, 328, 543, 517));
    enhancementsByItemRating.set(330, this.buildEnhancements(153, 330, 554, 527));
    enhancementsByItemRating.set(332, this.buildEnhancements(154, 332, 566, 539));
    enhancementsByItemRating.set(334, this.buildEnhancements(155, 334, 577, 550));
    enhancementsByItemRating.set(336, this.buildEnhancements(156, 336, 559, 561));
    enhancementsByItemRating.set(338, this.buildEnhancements(157, 338, 602, 573));
    enhancementsByItemRating.set(340, this.buildEnhancements(158, 340, 614, 585));
    enhancementsByItemRating.set(342, this.buildEnhancements(159, 342, 627, 597));
    enhancementsByItemRating.set(344, this.buildEnhancements(160, 344, 640, 609));   
    
    return enhancementsByItemRating;

  }

  private createAvailableAugments(): Map<number, Array<Augment>> {

    let augmentsByItemRating: Map<number, Array<Augment>> = new Map<number, Array<Augment>>;

    augmentsByItemRating.set(276, this.buildAugments(130, 276, 95));
    augmentsByItemRating.set(286, this.buildAugments(131, 286, 108));
    augmentsByItemRating.set(296, this.buildAugments(140, 296, 123));
    augmentsByItemRating.set(300, this.buildAugments(134, 300, 130));
    augmentsByItemRating.set(302, this.buildAugments(143, 302, 133));
    augmentsByItemRating.set(310, this.buildAugments(143, 310, 147));
    augmentsByItemRating.set(318, this.buildAugments(143, 318, 162));

    return augmentsByItemRating;

  }

  private buildEnhancements(itemLevel: number, itemRating: number, healAndDamageStat: number, tankStat: number): Array<Enhancement> {

    let enhancements: Array<Enhancement> = new Array<Enhancement>;

    enhancements.push(new Enhancement(itemLevel, itemRating, ItemType.critical, healAndDamageStat));
    enhancements.push(new Enhancement(itemLevel, itemRating, ItemType.alacrity, healAndDamageStat));
    enhancements.push(new Enhancement(itemLevel, itemRating, ItemType.accuracy, healAndDamageStat));
    enhancements.push(new Enhancement(itemLevel, itemRating, ItemType.absorb, tankStat));
    enhancements.push(new Enhancement(itemLevel, itemRating, ItemType.shield, tankStat));
    
    return enhancements;

  }

  private buildAugments(itemLevel: number, itemRating: number, stat: number): Array<Augment> {

    let augments = new Array<Augment>;

    augments.push(new Augment(itemLevel, itemRating, ItemType.absorb, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.accuracy, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.alacrity, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.critical, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.defense, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.mastery, stat));
    augments.push(new Augment(itemLevel, itemRating, ItemType.shield, stat));

    return augments;

  }

  getEnhancement(itemRating: number, itemType: ItemType): Enhancement | undefined {

    let enhancements: Array<Enhancement> = this.enhancementsByItemRating.get(itemRating) as Array<Enhancement>;

    let enhancement: Enhancement | undefined = undefined;

    for(let i: number = 0; i != enhancements.length; i = i + 1) {

      if( enhancements.at(i)?.itemType == itemType ) {

        enhancement = enhancements.at(i);
        break;


      }

    }

    return enhancement;

  }

  getAugment(itemRating: number, itemType: ItemType): Augment | undefined {

    let augments: Array<Augment> = this.augmentsByItemRating.get(itemRating) as Array<Augment>;

    let augment: Augment | undefined = undefined;

    for(let i: number = 0; i != augments.length; i = i + 1) {

      if( augments.at(i)?.itemType == itemType ) {

        augment = augments.at(i);
        break;

      }

    }

    return augment;

  }

}
