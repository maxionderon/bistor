import { ItemType } from "./itemType";

export class Item {

    itemLevel: number;
    itemRating: number;
    itemType: ItemType;

    constructor(itemLevel: number, itemRating: number, itemType: ItemType) {

        this.itemLevel = itemLevel;
        this.itemRating = itemRating;
        this.itemType = itemType;
        
    }

}