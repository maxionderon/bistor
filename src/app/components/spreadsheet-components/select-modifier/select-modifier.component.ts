import { Component, Input } from '@angular/core';
import { IconDefinition, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Modifier } from '../../../model/modifier';
import { IconService } from '../../../services/iconService/icon.service';
import { ModifierType } from '../../../model/modifier-type';


@Component({
  selector: 'app-select-modifier',
  imports: [FontAwesomeModule],
  templateUrl: './select-modifier.component.html',
  styleUrl: './select-modifier.component.css'
})
export class SelectModifierComponent {

  @Input("Icon")
  icon: IconDefinition;
  @Input("Modifiers")
  modifiers: Map<Modifier, boolean>;

  iconService: IconService;

  constructor() {

    this.icon = {} as IconDefinition;

    this.modifiers = new Map<Modifier, boolean>();

    this.iconService = new IconService();

  }

  protected change(modifier: Modifier): void {

    if( modifier.mutualExclusive = false ) {

      this.modifiers.set( modifier, !(this.modifiers.get(modifier) as boolean) );

    } else {

      this.modifiers.set( modifier, !(this.modifiers.get(modifier) as boolean) );

      for(const modifierCheck of this.modifiers.keys()) {

        if( modifierCheck.itemType == modifier.itemType && modifierCheck != modifier) {

          this.modifiers.set(modifierCheck, false);

        }

      }

    }

  }

  protected isChecked(modifier: Modifier): boolean {

    return this.modifiers.get(modifier) as boolean;

  }

  protected getDescription(modifier: Modifier): string | undefined {
  
    if( modifier.modifierType == ModifierType.companionBonus ) {

      return String(modifier.valueInPercent) + "% " + modifier.itemType + " (Companion)";

    }

    if( modifier.modifierType == ModifierType.combatOrCarnageOrGunneryOrArsenal ) {

      return String(modifier.valueInPercent) + "% " + modifier.itemType + " (Combat/Carnage/Gunnery/Arsenal)";

    }

    if( modifier.modifierType == ModifierType.telekineticsOrLightning ) {

      return String(modifier.valueInPercent) + "% " + modifier.itemType + " (Telekinetics/Lightning)"

    }

    return undefined;
  
  }
  
  



}
