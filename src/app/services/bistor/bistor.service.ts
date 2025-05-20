import { Injectable } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { Item } from '../../model/item';
import { ItemClass } from '../../model/itemClass';
import { Stim } from '../../model/stim';

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
  setBonusByItemRating: Map<number, Array<Enhancement>>;
  stimByItemRating: Map<number, Array<Stim>>;
  itemRatingStims: Array<number>;
  
  constructor() { 
    
    this.enhancementsItemTypes = new Array<ItemType>

    this.enhancementsItemTypes.push(ItemType.absorb);
    this.enhancementsItemTypes.push(ItemType.accuracy);
    this.enhancementsItemTypes.push(ItemType.alacrity);
    this.enhancementsItemTypes.push(ItemType.critical);
    this.enhancementsItemTypes.push(ItemType.shield);

    this.enhancementsByItemRating = this.createAvailableEnhancements();
    
    this.augmentsItemTypes = new Array<ItemType>;

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

    this.setBonusByItemRating = this.createAvailableSetBonus();

    this.stimByItemRating = this.createAvailableStims();
    this.itemRatingStims = Array.from(this.stimByItemRating.keys());

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

  private createAvailableSetBonus(): Map<number, Array<Enhancement>> {

    let setBonusByItemRating: Map<number, Array<Enhancement>> = new Map<number, Array<Enhancement>>;

    setBonusByItemRating.set(340, this.buildSetBonus(154, 340, 614, 585));

    return setBonusByItemRating;

  }

  private createAvailableStims(): Map<number, Array<Stim>> {

    let stimByItemRating: Map<number, Array<Stim>> = new Map<number, Array<Stim>>;

    stimByItemRating.set(270, this.buildStims(132, 270, 240, 99));
    stimByItemRating.set(280, this.buildStims(132, 280, 251, 104));
    stimByItemRating.set(288, this.buildStims(132, 288, 264, 109));
    stimByItemRating.set(296, this.buildStims(132, 296, 264, 109));

    return stimByItemRating;

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

  private buildSetBonus(itemLevel: number, itemRating: number, healAndDamageStat: number, tankStat: number): Array<Enhancement> {

    let setBonus = new Array<Enhancement>;

    setBonus.push(new Enhancement(itemLevel, itemRating, ItemType.absorb, tankStat));
    setBonus.push(new Enhancement(itemLevel, itemRating, ItemType.shield, tankStat));
    setBonus.push(new Enhancement(itemLevel, itemRating, ItemType.alacrity, healAndDamageStat));
    setBonus.push(new Enhancement(itemLevel, itemRating, ItemType.critical, healAndDamageStat));

    return setBonus;

  }

  private buildStims(itemLevel: number, itemRating: number, tertiaryStat: number, secondStat: number): Array<Stim> {

    let stims: Array<Stim> = new Array<Stim>;

    //fortitude stim
    stims.push( new Stim(itemLevel, itemRating, ItemType.endurance, tertiaryStat, ItemType.defense, secondStat) );
    //versatile stim
    stims.push( new Stim(itemLevel, itemRating, ItemType.mastery, tertiaryStat, ItemType.power, secondStat) );
    //Kyrprax Proficient
    stims.push( new Stim(itemLevel, itemRating, ItemType.accuracy, tertiaryStat, ItemType.critical, secondStat) );    

    return stims;

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

  getStim(itemRating: number, itemType: ItemType): Stim | undefined {

    let stims: Array<Stim> = this.stimByItemRating.get(itemRating) as Array<Stim>;

    let stim: Stim | undefined = undefined;

    for(let i: number = 0; i != stims.length; i = i + 1) {

      if( stims.at(i)?.itemType == itemType || stims.at(i)?.secondItemType == itemType ) {

        stim = stims.at(i);
        break;

      }

    }

    return stim;

  }

  getItem(itemRating: number, itemType: ItemType, itemClass: ItemClass): Item | undefined {

    if( itemClass == ItemClass.enhancement ) {

      return this.getEnhancement(itemRating, itemType);

    }

    if( itemClass == ItemClass.augment ) {

      return this.getAugment(itemRating, itemType);

    }

    if( itemClass == ItemClass.stim ) {

      return this.getStim(itemRating, itemType);

    }

    return undefined;

  }

}