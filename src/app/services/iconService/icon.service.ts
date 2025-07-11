import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { fa1, fa2, faAngleDown, faAngleUp, faArrowTrendDown, faArrowTrendUp, faAsterisk, faBolt, faCalculator, faCircleCheck, faCrosshairs, faGaugeHigh, faGears, faHeart, faNotdef, faPercent, faRoadBarrier, faShield, faShieldHalved, faStar, faSyringe, faTable, faTemperatureArrowDown, faTemperatureArrowUp, faTriangleExclamation, faUserGear, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ItemType } from '../../model/itemType';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  iconGear: IconDefinition;
  iconEnhancements: IconDefinition;
  iconAugments: IconDefinition;
  iconSetBonus: IconDefinition;
  iconStim: IconDefinition;
  iconModifier: IconDefinition;

  iconShowMore: IconDefinition;
  iconShowLess: IconDefinition;
  iconCalculate: IconDefinition;

  iconFirst: IconDefinition;
  iconSecond: IconDefinition;

  iconSuccess: IconDefinition;

  iconLimits: IconDefinition;
  iconWarning: IconDefinition;

  iconLimitMinimum: IconDefinition;
  iconLimitMaximum: IconDefinition;

  iconTable: IconDefinition;

  iconPercent: IconDefinition;
  
  constructor() { 

    this.iconGear = faGears;
    this.iconEnhancements = faUserGear;
    this.iconAugments = faUserPlus;
    this.iconSetBonus = faStar;
    this.iconStim = faSyringe;
    this.iconModifier = faUserPen;
    
    this.iconShowMore = faAngleDown;
    this.iconShowLess = faAngleUp;
    this.iconCalculate = faCalculator;

    this.iconFirst = fa1;
    this.iconSecond = fa2;

    this.iconSuccess = faCircleCheck;

    this.iconLimits = faRoadBarrier;
    this.iconWarning = faTriangleExclamation;

    this.iconLimitMinimum = faTemperatureArrowDown;
    this.iconLimitMaximum = faTemperatureArrowUp;

    this.iconTable = faTable;

    this.iconPercent = faPercent;

  }

  getIcon(itemType: ItemType): IconDefinition {

    if( itemType == ItemType.accuracy ) {
    
      return faCrosshairs;
    
    }
    
    if( itemType == ItemType.alacrity ) {
    
      return faGaugeHigh;
    
    }
    
    if( itemType == ItemType.critical ) {

      return faArrowTrendUp;

    }

    if( itemType == ItemType.shield ) {

      return faShieldHalved;

    }

    if( itemType == ItemType.absorb ) {

      return faArrowTrendDown;

    }

    if( itemType == ItemType.defense ) {

      return faShield;

    }

    if( itemType == ItemType.mastery ) {

      return faAsterisk;

    }

    if( itemType == ItemType.endurance ) {

      return faHeart;

    }

    if( itemType == ItemType.power ) {

      return faBolt;

    }

    return faNotdef;

  }

  getIconColor(itemType: ItemType): string  {

    if( itemType == ItemType.accuracy ) {

      return "has-text-warning";

    }

    if( itemType == ItemType.alacrity ) {

      return "has-text-success";

    }

    if( itemType == ItemType.critical ) {

      return "has-text-danger";

    }

    if( itemType == ItemType.shield ) {

      return "has-text-info";

    }

    if( itemType == ItemType.absorb ) {

      return "has-text-link";

    }

    if( itemType == ItemType.defense) {

      return "has-text-info-30";

    }

    if( itemType == ItemType.mastery ) {

      return "has-text-danger-70";

    }

    if( itemType == ItemType.endurance ) {

      return "has-text-info-30";

    }

    if( itemType == ItemType.power ) {

      return "has-text-danger-70";

    }

    return "";

  }

}
