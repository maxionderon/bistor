import { Item } from "./item";
import { ItemType } from "./itemType";

export class Augment extends Item{

    tertiaryStat: number; 

    constructor(itemLevel: number, itemRating: number, itemType: ItemType, tertiaryStat: number) {

        super(itemLevel, itemRating, itemType);
        
        this.tertiaryStat=tertiaryStat;

    }

}