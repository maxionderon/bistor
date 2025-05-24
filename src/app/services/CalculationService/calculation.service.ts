import { Injectable } from '@angular/core';
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

  calculateResults(enhancements: Array<Enhancement>, augments: Array<Augment>, setBonus: Array<Enhancement>, stim: Stim | undefined): Array<Result> {

    let results: Array<Result> = new Array<Result>;
    let items: Array<Item> = new Array<Item>;
    let buildWithAugments: boolean = false;

    items = items.concat(enhancements);

    if( augments.length != 0 ) {

      buildWithAugments = true;
      items = items.concat(augments);

    } 

    this.calculate(items, results, buildWithAugments);
  
    results = this.attachSetBonus(results, setBonus);
    
    if( stim != undefined ) {

      let resultsWithStim: Array<Result> = new Array<Result>;

      results.forEach( (result: Result) => {

        resultsWithStim.push(new Result(result.enhancements, result.augments, stim));

      });

      results = results.concat(resultsWithStim);
      
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

        augments.push(filledItems.at(i) as Augment);

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

  private calculate(items: Array<Item>, results: Array<Result>, buildWithAugments: boolean, filledItems?: Array<Item>) : void {

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

          this.calculate(nextItems, results, buildWithAugments, nextFilledItems);
          
        }    

      }

    }
 
  }

  private attachSetBonus(results: Array<Result>, setBonus: Array<Enhancement>): Array<Result> {
 
    if( setBonus.length == 0 || setBonus.length > 2 ) {
      
      return results;

    }
    
    let newResults: Array<Result> = new Array<Result>;

    let firstSetBonus: Enhancement;
    let secondSetBonus: Enhancement | undefined;

    firstSetBonus = setBonus.at(0) as Enhancement;
    
    if(setBonus.length > 1 ) {

      secondSetBonus = setBonus.at(1);

    }

    for(let i: number = 0; i != results.length; i = i + 1) {

      if( results.at(i)?.attachSetBonus(firstSetBonus, secondSetBonus) == true ) {
        
        newResults.push(results.at(i) as Result);

      }

    }
    
    results = newResults;

    return results;

  }

}