import { GenericDrug } from "./GenericDrug";

export class HerbalTea extends GenericDrug {
  updateBenefit() {
    if (this.expiresIn < 0) {
      this.benefit += 2;
    } else {
      this.benefit += 1;
    }

    if (this.benefit > 50) {
      this.benefit = 50;
    }
  }
}
