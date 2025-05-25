import { Item } from "./item";
import { ItemType } from "./itemType";

export class Enhancement extends Item {

    tertiaryStat: number;
    setBonus: boolean;

    constructor(itemLevel: number, itemRating:number, itemType: ItemType, tertiaryStat: number, setBonus: boolean) {

        super(itemLevel, itemRating, itemType);
        
        this.tertiaryStat=tertiaryStat;
        this.setBonus = setBonus;

    }
    
}