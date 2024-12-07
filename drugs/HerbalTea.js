import { MAX_BENEFIT } from "../pharmacy";
import { GenericDrug } from "./GenericDrug";

export class HerbalTea extends GenericDrug {
  updateBenefit() {
    super.updateBenefit();

    this.benefit = Math.min(this.benefit, MAX_BENEFIT);
  }

  computeValueToAddToBenefit() {
    return this.expiresIn <= 0 ? 2 : 1;
  }
}
