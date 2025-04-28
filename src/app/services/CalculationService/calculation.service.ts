import { Injectable } from '@angular/core';
import { ItemType } from '../../model/itemType';
import { Enhancement } from '../../model/enhancement';
import { Augment } from '../../model/augment';
import { Stim } from '../../model/stim';
import { Result } from '../../model/result';

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
    let accuracyStim = new Stim(132, 288, ItemType.accuracy, "Fortschrittlicher fähiger Kyrprax-Stim", 264);

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
    //console.log(results);

  }

}
