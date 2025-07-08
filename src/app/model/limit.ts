import { ItemType } from "./itemType";

export class Limit {

    minimum: number;
    itemType: ItemType;
    maximum: number;

    constructor(minimum: number, itemType: ItemType, maximum: number) {

        this.minimum = minimum;
        this.itemType = itemType;
        this.maximum = maximum;

    }

}