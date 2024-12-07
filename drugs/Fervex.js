import { MAX_BENEFIT } from "../pharmacy";
import { GenericDrug } from "./GenericDrug";

export class Fervex extends GenericDrug {
  updateBenefit() {
    super.updateBenefit();

    this.benefit = Math.min(this.benefit, MAX_BENEFIT);
  }

  computeValueToAddToBenefit() {
    let value = 1;
    if (this.expiresIn <= 0) {
      value = -this.benefit;
    } else if (this.expiresIn <= 5) {
      value = 3;
    } else if (this.expiresIn <= 10) {
      value = 2;
    }

    return value;
  }
}
