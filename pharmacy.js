export const MAX_BENEFIT = 50;
export const MIN_BENEFIT = 0;

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].update();
    }

    return this.drugs;
  }
}
