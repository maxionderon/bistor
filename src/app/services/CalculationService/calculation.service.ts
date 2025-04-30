import { Injectable } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { Stim } from '../../model/stim';
import { Result } from '../../model/result';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculate(): Array<Result> {
    
    //7 Enhancements
    //2 Implants
    //1 EarPeaces
    //14 Augments

    //create enhancements
    let criticalEnhancement = new Enhancement(156, 336, ItemType.critical, "Advanced Adept Enhancement 99", 589);
    let alacrityEnhancement = new Enhancement(156, 336, ItemType.alacrity, "Advanced Nimble Enhancement 99", 589);
    let accuracyEnhancement = new Enhancement(156, 336, ItemType.accuracy, "Advanced Initiative Enhancement 99", 589);

    //create Augments
    let criticalAugment = new Augment(143, 310, ItemType.critical, "Advanced Critical Augment 86", 147);
    let alacrityAugment= new Augment(143, 310, ItemType.alacrity, "Advanced Alacrity Augment 86", 147);
    let accuracyAugment = new Augment(143, 310, ItemType.accuracy, "Advanced Accuracy Augment 86", 147);

    //create Stim
    let accuracyStim = new Stim(132, 288, ItemType.accuracy, "Fortschrittlicher fähiger Kyrprax-Stim", 264, ItemType.critical, 109);

    let results = new Array<Result>;

    //start with critical Enhancements
    for(let criticalEnhancementCounter: number = 0; criticalEnhancementCounter <= 10; criticalEnhancementCounter = criticalEnhancementCounter + 1) {
     
      let criticalEnhancements = new Array<Enhancement>;

      //fill crit Enhancements
      for(let i = 0; i != criticalEnhancementCounter; i=i+1) {

        criticalEnhancements.push(criticalEnhancement);

      }

      //alacrity Enhancements
      for(let alacrityEnhancementCounter: number = 0; alacrityEnhancementCounter <= 10 - criticalEnhancements.length; alacrityEnhancementCounter= alacrityEnhancementCounter + 1) {

        let alacrityEnhancements = new Array<Enhancement>;

        //fill alacrity Enhancements
        for(let i = 0; i != alacrityEnhancementCounter; i = i + 1) {

          alacrityEnhancements.push(alacrityEnhancement);

        }
      
        //accuracy Enhancements
        for(let accuracyEnhancementsCounter: number = 0; accuracyEnhancementsCounter <= 10 - criticalEnhancements.length - alacrityEnhancements.length; accuracyEnhancementsCounter = accuracyEnhancementsCounter + 1) {

          let accuracyEnhancements = new Array<Enhancement>;

          //fill accuracy Enhancements
          for(let i = 0; i != accuracyEnhancementsCounter; i = i + 1) {

            accuracyEnhancements.push(accuracyEnhancement);

          }
          /*
          if( criticalEnhancements.length + alacrityEnhancements.length + accuracyEnhancements.length == 10) {

            results.push(new Result(criticalEnhancements.concat(alacrityEnhancements).concat(accuracyEnhancements), augments, accuracyStim));
  
          }
          */

          //critical Augments
          for(let criticalAugmentCounter: number = 0; criticalAugmentCounter <= 14; criticalAugmentCounter = criticalAugmentCounter + 1) {

            let criticalAugments = new Array<Augment>;

            //fill critical Augments
            for(let i = 0; i != criticalAugmentCounter; i = i + 1) {

              criticalAugments.push(criticalAugment);

            }

            //alacrity Augments
            for(let alacrityAugmentCounter = 0; alacrityAugmentCounter <= 14 - criticalAugments.length; alacrityAugmentCounter = alacrityAugmentCounter + 1) {

              let alacrityAugments = new Array<Augment>;

              //fill alacrity Augments
              for(let i = 0; i != alacrityAugmentCounter; i = i + 1) {

                alacrityAugments.push(alacrityAugment);

              }
              /*
              if( criticalEnhancements.length + alacrityEnhancements.length + accuracyEnhancements.length == 10 && criticalAugments.length + alacrityAugments.length == 14) {

                results.push(new Result(criticalEnhancements.concat(alacrityEnhancements).concat(accuracyEnhancements), criticalAugments.concat(alacrityAugments), accuracyStim));
      
              }
              */
              

              //accuracy Augments
              for(let accuracyAugmentCounter = 0; accuracyAugmentCounter <= 14 -criticalAugments.length - alacrityAugments.length; accuracyAugmentCounter = accuracyAugmentCounter + 1) {

                let accuracyAugments = new Array<Augment>;

                //fill accuracy Augments
                for(let i = 0; i != accuracyAugmentCounter; i = i + 1) {

                  accuracyAugments.push(accuracyAugment);

                }
                
                if( criticalEnhancements.length + alacrityEnhancements.length + accuracyEnhancements.length == 10 && criticalAugments.length + alacrityAugments.length + accuracyAugments.length == 14) {

                  results.push(new Result(criticalEnhancements.concat(alacrityEnhancements).concat(accuracyEnhancements), criticalAugments.concat(alacrityAugments).concat(accuracyAugments), accuracyStim));
        
                }
                
              }             

            }

            


          }

        }
      
      }

    }

    return results;
    
  }

  private fillItems(item: Item, itemCounter: number): Array<Item> {

    let items: Array<Item> = new Array<Item>;

    for(let i: number = 0; i != itemCounter; i = i + 1) {

      items.push(item);

    }

    return items;

  }

  calculateNew(): Array<Result> {
    
    //7 Enhancements
    //2 Implants
    //1 EarPeaces
    //14 Augments

    //create enhancements
    let criticalEnhancement = new Enhancement(156, 336, ItemType.critical, "Advanced Adept Enhancement 99", 589);
    let alacrityEnhancement = new Enhancement(156, 336, ItemType.alacrity, "Advanced Nimble Enhancement 99", 589);
    let accuracyEnhancement = new Enhancement(156, 336, ItemType.accuracy, "Advanced Initiative Enhancement 99", 589);

    //create Augments
    let criticalAugment = new Augment(143, 310, ItemType.critical, "Advanced Critical Augment 86", 147);
    let alacrityAugment= new Augment(143, 310, ItemType.alacrity, "Advanced Alacrity Augment 86", 147);
    let accuracyAugment = new Augment(143, 310, ItemType.accuracy, "Advanced Accuracy Augment 86", 147);

    //create Stim
    let accuracyStim = new Stim(132, 288, ItemType.accuracy, "Fortschrittlicher fähiger Kyrprax-Stim", 264, ItemType.critical, 109);

    let results = new Array<Result>;

    //start with critical Enhancements
    for(let criticalEnhancementCounter: number = 0; criticalEnhancementCounter <= 10; criticalEnhancementCounter = criticalEnhancementCounter + 1) {
     
      let criticalEnhancements: Array<Enhancement>;

      //fill crit Enhancements
      criticalEnhancements = this.fillItems(criticalEnhancement, criticalEnhancementCounter) as Array<Enhancement>;

      //alacrity Enhancements
      for(let alacrityEnhancementCounter: number = 0; alacrityEnhancementCounter <= 10 - criticalEnhancements.length; alacrityEnhancementCounter= alacrityEnhancementCounter + 1) {

        let alacrityEnhancements: Array<Enhancement>;

        //fill alacrity Enhancements
        alacrityEnhancements = this.fillItems(alacrityEnhancement, alacrityEnhancementCounter) as Array<Enhancement>;
      
        //accuracy Enhancements
        for(let accuracyEnhancementsCounter: number = 0; accuracyEnhancementsCounter <= 10 - criticalEnhancements.length - alacrityEnhancements.length; accuracyEnhancementsCounter = accuracyEnhancementsCounter + 1) {

          let accuracyEnhancements: Array<Enhancement>;

          //fill accuracy Enhancements
          accuracyEnhancements = this.fillItems(accuracyEnhancement, accuracyEnhancementsCounter) as Array<Enhancement>;
          
          //critical Augments
          for(let criticalAugmentCounter: number = 0; criticalAugmentCounter <= 14; criticalAugmentCounter = criticalAugmentCounter + 1) {

            let criticalAugments: Array<Augment>;

            //fill critical Augments
            criticalAugments = this.fillItems(criticalAugment, criticalAugmentCounter) as Array<Augment>;

            //alacrity Augments
            for(let alacrityAugmentCounter = 0; alacrityAugmentCounter <= 14 - criticalAugments.length; alacrityAugmentCounter = alacrityAugmentCounter + 1) {

              let alacrityAugments: Array<Augment>;

              //fill alacrity Augments
              alacrityAugments = this.fillItems(alacrityAugment, alacrityAugmentCounter) as Array<Augment>;                            

              //accuracy Augments
              for(let accuracyAugmentCounter = 0; accuracyAugmentCounter <= 14 -criticalAugments.length - alacrityAugments.length; accuracyAugmentCounter = accuracyAugmentCounter + 1) {

                let accuracyAugments: Array<Augment>;

                //fill accuracy Augments
                accuracyAugments = this.fillItems(accuracyAugment, accuracyAugmentCounter) as Array<Augment>;
                
                if( criticalEnhancements.length + alacrityEnhancements.length + accuracyEnhancements.length == 10 && criticalAugments.length + alacrityAugments.length + accuracyAugments.length == 14) {

                  results.push(new Result(criticalEnhancements.concat(alacrityEnhancements).concat(accuracyEnhancements), criticalAugments.concat(alacrityAugments).concat(accuracyAugments), accuracyStim));
        
                }
                
              }             

            }
          
          }

        }
      
      }

    }

    return results;

  }

  calculateNew2(): Array<Result> {
    
    //7 Enhancements
    //2 Implants
    //1 EarPeaces
    //14 Augments

    //create enhancements
    let criticalEnhancement = new Enhancement(156, 336, ItemType.critical, "Advanced Adept Enhancement 99", 589);
    let alacrityEnhancement = new Enhancement(156, 336, ItemType.alacrity, "Advanced Nimble Enhancement 99", 589);
    let accuracyEnhancement = new Enhancement(156, 336, ItemType.accuracy, "Advanced Initiative Enhancement 99", 589);
    
    //create Augments
    let criticalAugment = new Augment(143, 310, ItemType.critical, "Advanced Critical Augment 86", 147);
    let alacrityAugment= new Augment(143, 310, ItemType.alacrity, "Advanced Alacrity Augment 86", 147);
    let accuracyAugment = new Augment(143, 310, ItemType.accuracy, "Advanced Accuracy Augment 86", 147);

    //create Stim
    let accuracyStim = new Stim(132, 288, ItemType.accuracy, "Fortschrittlicher fähiger Kyrprax-Stim", 264, ItemType.critical, 109);


    let items: Array<Item> = new Array<Item>;

    items.push(criticalEnhancement);
    items.push(alacrityEnhancement);
    items.push(accuracyEnhancement);
    items.push(criticalAugment);
    items.push(alacrityAugment);
    items.push(accuracyAugment);
    items.push(accuracyStim);

    let results: Array<Result> = new Array<Result>;

    this.bob3(items, results, true);

    return results

  }
  
  private getMaxLoopCount(item: Item, filledItems: Array<Item>): number {

    if( item instanceof Enhancement) {

      return (10 - this.getNumberOfEnhancements(filledItems));

    }

    if( item instanceof Augment ) {

      return (14 - this.getNumberOfAugments(filledItems));

    }

    return 0;

  }

  private getNumberOfAugments(filledItems: Array<Item>): number {

    let numberOfAugments: number = 0;

    for(let i: number = 0; i != filledItems.length; i = i + 1) {

      if( filledItems.at(i) instanceof Augment) {

        numberOfAugments = numberOfAugments + 1;

      }

    }

    return numberOfAugments;

  }

  private getNumberOfEnhancements(filledItems: Array<Item>): number {

    let numberOfEnhancements: number = 0;

    for(let i: number = 0; i != filledItems.length; i = i + 1) {

      if( filledItems.at(i) instanceof Enhancement ) {

        numberOfEnhancements = numberOfEnhancements + 1;

      }

    }

    return numberOfEnhancements;

  }

  private buildResult(filledItems: Array<Item>, buildWithAugments: boolean): Result | undefined {

    let enhancements: Array<Enhancement> = new Array<Enhancement>;
    let augments: Array<Augment> = new Array<Enhancement>;
    
    for(let i: number = 0; i != filledItems.length; i = i + 1) {

      if( filledItems.at(i) instanceof Enhancement ) {

        enhancements.push(filledItems.at(i) as Enhancement);

      }

      if( filledItems.at(i) instanceof Augment ) {

        augments.push(filledItems.at(0) as Augment);

      }

    }

    if( buildWithAugments == true ) {

      if( enhancements.length == 10 && augments.length == 14 ) {

        return new Result(enhancements, augments);

      }

    } else {

      if( enhancements.length == 10 ) {

        return new Result(enhancements, augments);

      }

    }

    return undefined;

  }

  bob3(items: Array<Item>, results: Array<Result>, buildWithAugments: boolean, filledItems?: Array<Item>) : void {

    if( filledItems == undefined ) {
      
      filledItems = new Array<Item>;

    }

    if( items.length != 0 ) {
      
      for(let i: number = 0; i <= this.getMaxLoopCount( items.at(0) as Item, filledItems); i = i + 1 ) {

        let filledItemsTemp = filledItems?.concat( this.fillItems(items.at(0) as Item, i) );
        
        let result = this.buildResult(filledItemsTemp, buildWithAugments);

        if( result != undefined ) {

          results.push(result as Result);
          //break;
          
        } else {
          
          //start recursion
          //copy arrays
          let nextItems = items.concat([]);
          //delete first element
          nextItems.shift();
          let nextFilledItems = filledItemsTemp.concat([]);

          this.bob3(nextItems, results, buildWithAugments, nextFilledItems);
          
        }    

      }

    }

  }

}