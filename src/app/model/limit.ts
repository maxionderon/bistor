import { ItemType } from "./itemType";

export class Limit {

    minimum: number;
    itemType: ItemType;
    maximum: number;
    possible: boolean;

    constructor(minimum: number, itemType: ItemType, maximum: number, possible: boolean) {

        this.minimum = minimum;
        this.itemType = itemType;
        this.maximum = maximum;
        this.possible = possible
        
    }

}