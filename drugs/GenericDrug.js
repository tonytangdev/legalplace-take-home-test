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
    if (this.expiresIn < 0) {
      this.benefit -= 2;
    } else {
      this.benefit -= 1;
    }

    if (this.benefit < 0) {
      this.benefit = 0;
    }
  }
}
