import { ItemType } from "./itemType";
import { Modifier } from "./modifier";

export class Modifiers {

    modifiers: Map<ItemType, number>;

    constructor() {

        this.modifiers = new Map<ItemType, number>();

    }

    buildModifiers(chosenModifiers: Map<Modifier, boolean>): Map<ItemType, number> {

        this.modifiers = new Map<ItemType, number>();

        chosenModifiers.forEach( (wasChosen: boolean, modifier: Modifier) => {

            if( wasChosen == true ) {
            
                if( this.modifiers.has(modifier.itemType) ) {
                
                    this.modifiers.set( modifier.itemType, (this.modifiers.get(modifier.itemType) as number) + modifier.valueInPercent );
                
                } else {
                
                    this.modifiers.set( modifier.itemType, modifier.valueInPercent );
                
                }
            
            }

        });

        return this.modifiers;

    }

    getModifier(itemType: ItemType): number {
    
        if( this.modifiers.has(itemType) ) {
        
          return this.modifiers.get(itemType) as number;
        
        }
    
        return 0;
    
    }


}