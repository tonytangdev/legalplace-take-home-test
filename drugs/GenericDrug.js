import { MIN_BENEFIT } from "../pharmacy";

export class GenericDrug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  update() {
    this.updateBenefit();
    this.updateExpiresIn();
  }

  updateExpiresIn() {
    this.expiresIn -= 1;
  }

  updateBenefit() {
    this.benefit += this.computeValueToAddToBenefit();
    this.benefit = Math.max(this.benefit, MIN_BENEFIT);
  }

  computeValueToAddToBenefit() {
    return this.expiresIn <= 0 ? -2 : -1;
  }
}
