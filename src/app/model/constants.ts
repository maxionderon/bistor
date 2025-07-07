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
            divisor = 2.189;
            cap = 50;
        
        }

        if( itemType == ItemType.accuracy ) {

            base = 0;
            divisor = 3.2;
            cap = 30;
            
        }

        if( itemType == ItemType.alacrity ) {

            base = 0;
            divisor = 3.2;
            cap = 30;

        }

        if( itemType == ItemType.critical ) {

            base = 5;
            divisor = 2.41;
            cap = 30;

        }

        if( itemType == ItemType.defense ) {

            base = 10;
            divisor = 5;
            cap = 30;

        }

        if( itemType == ItemType.shield ) {

            base = 20;
            divisor = 2.079;
            cap = 50;

        }

        return new Constants(base, divisor, cap);

    }

    public static getPercent(rating: number, itemType: ItemType): number {
        //https://forums.swtor.com/topic/883575-stat-equations/
        //https://forums.swtor.com/topic/888604-help-needed-alacrity-formula/
        //https://discord.com/channels/613633744246407178/943519822468218920

        let base: number = 0;
        let divisor: number = 0;
        let cap: number = 0;
        
        let constants: Constants = Constants.getConstants(itemType);
        base = constants.base;
        divisor = constants.divisor;
        cap = constants.cap;
        
        return cap * (1 - (1 - (1 / cap)) ** ( (rating / 80) / divisor ) ) + base;
    
    }

    public static getRating(percent: number, itemType: ItemType): number {

        let rating: number = 0;

        let base: number = 0;
        let divisor: number = 0;
        let cap: number = 0;
        
        let constants: Constants = Constants.getConstants(itemType);
        base = constants.base;
        divisor = constants.divisor;
        cap = constants.cap;

        let exponent: number = Math.log( (1 - (percent - base) / cap) ) / Math.log( (1 - (1 / cap )) ) ;

        rating = exponent * divisor * 80;

        return Math.round(rating);

    }

}