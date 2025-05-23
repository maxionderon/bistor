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

    setStim(stim: Stim) {

        this.stim = stim;
        this.values = this.calculateValues();

    }

    attachStim(stim: Stim): void {

        if( this.stim != undefined ) {

            this.subtractValue(this.stim.tertiaryStat, this.stim.itemType);
            this.subtractValue(this.stim.secondStat, this.stim.secondItemType);

        }
        
        this.addValue(stim.tertiaryStat, stim.itemType);
        this.addValue(stim.secondStat, stim. secondItemType);

        this.stim = stim;
        
    }

    attachSetBonus(firstSetBonus: Enhancement, secondSetBonus: Enhancement | undefined): boolean {
        
        if( secondSetBonus == undefined ) {

            return this.substituteEnhancement(firstSetBonus);

        } else {

            return this.substituteSetBonus(firstSetBonus, secondSetBonus);

        }
                
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

    private substituteEnhancement(enhancement: Enhancement): boolean {

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {

            if( this.enhancements.at(i)?.itemType == enhancement.itemType ) {

                this.enhancements.splice(i, 1, enhancement);
                this.values = this.calculateValues();
                return true;

            }

        }

        return false;

    }

    private substituteSetBonus(firstSetBonus: Enhancement, secondSetBonus: Enhancement): boolean {

        let positionOfFirstSetBonus: number = 0;
        let positionOfSecondSetBonus: number = 0;

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {
            
            if( this.enhancements.at(i)?.itemType == firstSetBonus.itemType ) {

                positionOfFirstSetBonus = i;
                break;
            
            }
            
        }

        if( positionOfFirstSetBonus == 0 ) {
            //no first Set Bonus possible
            return false;

        }

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {
            
            if( this.enhancements.at(i)?.itemType == secondSetBonus.itemType ) {

                if( i != positionOfFirstSetBonus ) {
                    
                    positionOfSecondSetBonus = i;
                    break;

                }

            }
            
        }

        if( positionOfSecondSetBonus == 0 ) {
            //no second Set Bonus possible
            return false;

        }

        this.enhancements.splice(positionOfFirstSetBonus, 1, firstSetBonus);
        this.enhancements.splice(positionOfSecondSetBonus, 1, secondSetBonus);
        this.values = this.calculateValues();

        return true;

    }
    
}