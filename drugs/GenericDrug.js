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
    throw new Error("updateExpiresIn must be implemented");
  }

  updateBenefit() {
    throw new Error("updateBenefit must be implemented");
  }
}
