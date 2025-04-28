import { Item } from "./item";
import { ItemType } from "./itemType";

export class Augment extends Item{

    name: string;
    tertiaryStat: number; 

    constructor(itemLevel: number, itemRating: number, itemType: ItemType, name:string, tertiaryStat: number) {

        super(itemLevel, itemRating, itemType);
        
        this.name=name;
        this.tertiaryStat=tertiaryStat;

    }

}