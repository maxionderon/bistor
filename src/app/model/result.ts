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
        this.values = new Map<ItemType, number>();

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

    getValues(): Map<ItemType, number> {

        this.values = this.calculateValues2();

        return this.values;

    }

    private calculateValues2(): Map<ItemType, number> {

        let values: Map<ItemType, number> = new Map<ItemType, number>;

        this.enhancements.forEach( (enhancement: Enhancement) => {

            this.addValue2(enhancement.tertiaryStat, enhancement.itemType, values);

        });
       
        this.augments.forEach( (augment: Augment) => {

            this.addValue2(augment.tertiaryStat, augment.itemType, values);

        });

        if( this.stim != undefined ) {

            this.addValue2(this.stim.tertiaryStat, this.stim.itemType, values);
            this.addValue2(this.stim.secondStat, this.stim.secondItemType, values)

        }

        this.values = values;

        return this.values;

    }

    getValue(itemType: ItemType): number {

        if( this.values.has(itemType) == true ) {

            return this.values.get(itemType) as number;

        } else {

            return 0;

        }

    }
    
    setStim(stim: Stim) {

        this.stim = stim;
        
    }
    
    attachSetBonus_old(firstSetBonus: Enhancement, secondSetBonus: Enhancement | undefined): boolean {
        
        if( secondSetBonus == undefined ) {

            return this.substituteEnhancement(firstSetBonus);

        } else {

            return this.substituteSetBonus(firstSetBonus, secondSetBonus);

        }
                
    }
    
    private addValue2(value: number, itemType: ItemType, values: Map<ItemType, number>): Map<ItemType, number> {

        if( values.has(itemType) ) {

            values.set( itemType, (values.get(itemType) as number) + value);

        } else {

            values.set(itemType, value);

        }

        return values;

    }

    private substituteEnhancement(enhancement: Enhancement): boolean {

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {

            if( this.enhancements.at(i)?.itemType == enhancement.itemType ) {

                this.enhancements.splice(i, 1, enhancement);
                return true;

            }

        }

        return false;

    }

    private substituteSetBonus(firstSetBonus: Enhancement, secondSetBonus: Enhancement): boolean {

        let positionOfFirstSetBonus: number | undefined = undefined;
        let positionOfSecondSetBonus: number | undefined = undefined;

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {
            
            if( this.enhancements.at(i)?.itemType == firstSetBonus.itemType ) {
                
                positionOfFirstSetBonus = i;
                break;
            
            }
            
        }

        if( positionOfFirstSetBonus == undefined ) {
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

        if( positionOfSecondSetBonus == undefined ) {
            //no second Set Bonus possible
            return false;

        }

        this.enhancements.splice(positionOfFirstSetBonus, 1, firstSetBonus);
        this.enhancements.splice(positionOfSecondSetBonus, 1, secondSetBonus);
        
        return true;

    }

    attachSetBonus(firstSetBonus: Enhancement, secondSetBonus: Enhancement): boolean {

        let positionOfFirstSetBonus: number | undefined = undefined;
        let positionOfSecondSetBonus: number | undefined = undefined;

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {

            if( firstSetBonus.itemType == this.enhancements.at(i)?.itemType ) {

                positionOfFirstSetBonus = i;
                break;

            }

        }

        if( positionOfFirstSetBonus == undefined ) {
            //no first Set Bonus possible
            return false;

        }

        for(let i: number = 0; i != this.enhancements.length; i = i + 1) {

            if( secondSetBonus.itemType == this.enhancements.at(i)?.itemType ) {

                if( i != positionOfFirstSetBonus) {

                    positionOfSecondSetBonus = i;
                    break;

                }

            }


        }

        if( positionOfSecondSetBonus == undefined ) {
            //no second Set Bonus possible
            return false;

        }
        
        this.enhancements.splice(positionOfFirstSetBonus, 1, firstSetBonus);
        this.enhancements.splice(positionOfSecondSetBonus, 1, secondSetBonus);

        return true;

    }
        
}