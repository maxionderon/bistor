import { ItemType } from "./itemType";
import { ModifierType } from "./modifier-type";

export class Modifier {

    itemType: ItemType;
    valueInPercent: number;
    modifierType: ModifierType;
    mutualExclusive: boolean;

    constructor(itemType: ItemType, valueInPercent: number, modifierType: ModifierType, mutualExclusive: boolean) {

        this.itemType = itemType;
        this.valueInPercent = valueInPercent;
        this.modifierType = modifierType;
        this.mutualExclusive = mutualExclusive;        

    }

}