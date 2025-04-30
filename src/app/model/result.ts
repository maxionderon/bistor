import { Augment } from "./augment";
import { Constants } from "./constants";
import { Enhancement } from "./enhancement";
import { ItemType } from "./itemType";
import { Stim } from "./stim";

export class Result {

    enhancements: Enhancement[];
    augments: Augment[];
    stim: Stim | undefined;
    isPossible: Boolean;
    values: Map<ItemType, number>;

    constructor(enhancements: Enhancement[], augments: Augment[], stim?: Stim) {

        this.enhancements = enhancements;
        this.augments = augments;
        this.stim = stim;

        this.isPossible = this.calculateIsPossible();
        this.values = this.calculateValues();

    }

    calculateIsPossible(): boolean {

        if( this.augments.length == 0 && this.enhancements.length == 10 ) {

            return true;

        }

        if( this.enhancements.length != 10) {

            return false;

        }

        if( this.augments.length != 14 ) {

            return false;

        }

        return true;

    }

    calculateValues(): Map<ItemType, number> {

        let values: Map<ItemType, number> = new Map<ItemType, number> ; 

        this.enhancements.forEach( (enhancement) => {

            this.addValue(enhancement.tertiaryStat, enhancement.itemType, values);

        });

        this.augments.forEach( (augment) => {

            this.addValue(augment.tertiaryStat, augment.itemType, values);
    
        });

        if( this.stim != undefined ) {

            this.addValue(this.stim.tertiaryStat, this.stim.itemType, values);
            this.addValue(this.stim.secondStat, this.stim.secondItemType, values);

        }       

        return values;

    }

    getValue(itemType: ItemType): number {

        if( this.values.has(itemType) == true ) {

            return this.values.get(itemType) as number;

        } else {

            return 0;

        }

    }

    getPercent(itemType: ItemType): number {
        //https://forums.swtor.com/topic/883575-stat-equations/
        //https://forums.swtor.com/topic/888604-help-needed-alacrity-formula/
        if( this.values.has(itemType) ) {
            
            let base: number = 0;
            let divisor: number = 0;
            let cap: number = 0;

            let rating: number = this.values.get(itemType) as number;
           
            let constants: Constants = Constants.getConstants(itemType);

            base = constants.base;
            divisor = constants.divisor;
            cap = constants.cap;

            return cap * (1 - (1 - (1 / 30)) ** ( (rating / 75) / divisor ) ) + base;


        } else {

            return Constants.getConstants(itemType).base;

        }
        
    }

    attachStim(stim: Stim): void {

        if( this.stim != undefined ) {

            this.subtractValue(stim.tertiaryStat, stim.itemType);
            this.subtractValue(stim.secondStat, stim.secondItemType);

        }
        
        this.addValue(stim.tertiaryStat, stim.itemType);
        this.addValue(stim.secondStat, stim. secondItemType);

        this.stim = stim;
        
    }

    private addValue(value: number, itemType: ItemType, values?: Map<ItemType, number>): void {

        if( values == undefined) {

            if( this.values.has(itemType) ) {

                this.values.set(itemType, this.values.get(itemType) as number + value);
    
            } else {
    
                this.values.set(itemType, value);
    
            }

        } else {

            if( values.has(itemType) ) {

                values.set(itemType, values.get(itemType) as number + value);

            } else {

                values.set(itemType, value);

            }

        }

    }

    private subtractValue(value: number, itemType: ItemType): boolean {

        if( this.values.has(itemType) ) {

            this.values.set(itemType, this.values.get(itemType) as number - value);

            return true;

        }

        return false;

    }

    substituteEnhancement(enhancement: Enhancement): boolean {

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {

            if( this.enhancements.at(i)?.itemType == enhancement.itemType ) {

                this.enhancements.splice(i, 1, enhancement);
                return true;

            }

        }

        return false;

    }
    

}