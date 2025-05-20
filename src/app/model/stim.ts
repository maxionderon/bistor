import { Item } from "./item";
import { ItemType } from "./itemType";

export class Stim extends Item{

    //name: string;
    tertiaryStat: number;
    secondItemType: ItemType;
    secondStat: number;
    
    constructor(itemLevel: number, itemRating: number, itemType: ItemType, /*name: string,*/ tertiaryStat: number, secondItemType: ItemType, secondStat: number) {

        super(itemLevel, itemRating, itemType);

        //this.name=name;
        this.tertiaryStat=tertiaryStat;
        this.secondItemType = secondItemType;
        this.secondStat=secondStat;

    }

}