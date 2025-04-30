import { ItemType } from "./itemType";

export class Constants {

    //base is in percent
    base: number;
    divisor: number;
    cap: number;

    constructor(base: number, divisor: number, cap: number) {
        
        this.base = base;           
        this.divisor = divisor;
        this.cap = cap;

    }

    public static getConstants(itemType: ItemType): Constants {

        let base: number = 0;
        let divisor: number = 0;
        let cap: number = 0;

        if( itemType == ItemType.absorb) {

            base = 5;
            divisor = 1.066;
            cap = 50;
        
        }

        if( itemType == ItemType.accuracy ) {

            base = 0;
            divisor = 2.015;
            cap = 30;
            
        }

        if( itemType == ItemType.alacrity ) {

            base = 0;
            divisor = 2.015;
            cap = 30;

        }

        if( itemType == ItemType.critical ) {

            base = 5;
            divisor = 1.503;
            cap = 30;

        }

        if( itemType == ItemType.defense ) {

            base = 10;
            divisor = 2.125;
            cap = 30;

        }

        if( itemType == ItemType.shield ) {

            base = 20;
            divisor = 1.279;
            cap = 50;

        }

        return new Constants(base, divisor, cap);

    }

}