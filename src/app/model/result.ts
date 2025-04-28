import { Augment } from "./augment";
import { Enhancement } from "./enhancement";
import { Item } from "./item";
import { ItemType } from "./itemType";
import { Stim } from "./stim";

export class Result {

    enhancements: Enhancement[];
    augments: Augment[];
    stim: Stim;
    isPossible: Boolean;
    values: Map<ItemType, number>;

    constructor(enhancements: Enhancement[], augments: Augment[], stim: Stim) {

        this.enhancements = enhancements;
        this.augments = augments;
        this.stim = stim;

        this.isPossible = this.calculateIsPossible();
        this.values = this.calculateValues();

    }

    calculateIsPossible(): boolean {

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

            let itemType: ItemType = enhancement.itemType;

            if( values.has(itemType) ) {

                values.set(itemType, values.get(itemType) as number + enhancement.tertiaryStat );

            } else {

                values.set(itemType, enhancement.tertiaryStat);

            }

        });

        this.augments.forEach( (augment) => {

            let itemType: ItemType = augment.itemType;

            if( values.has(itemType) ) {

                values.set(itemType, values.get(itemType) as number + augment.tertiaryStat);

            } else {

                values.set(itemType, augment.tertiaryStat);

            }

        });

        let itemType: ItemType = this.stim.itemType;

        if( values.has(itemType) ) {

            values.set(itemType, values.get(itemType) as number + this.stim.tertiaryStat);

        } else {

            values.set(itemType, this.stim.tertiaryStat);

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
            
            let divisor: number = 0;
            let cap: number = 0;

            let rating: number = this.values.get(itemType) as number;
           
            if( itemType == ItemType.absorb) {

                divisor = 1.066;
                cap = 50;
            
            }

            if( itemType == ItemType.accuracy ) {

                divisor = 2.015;
                cap = 30;
                
            }

            if( itemType == ItemType.alacrity ) {

                divisor = 2.015;
                cap = 30;

            }

            if( itemType == ItemType.critical ) {

                divisor = 1,503;
                cap = 30;

            }

            if( itemType == ItemType.defense ) {

                divisor = 2.125;
                cap = 30;

            }

            if( itemType == ItemType.shield ) {

                divisor = 1.279;
                cap = 50;

            }

            return cap * (1 - (1 - (1 / 30)) ** ( (rating / 75) / divisor ) )


        } else {

            return 0;

        }
        
    }

}