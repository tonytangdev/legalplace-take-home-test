import { Drug, Pharmacy, MIN_BENEFIT, MAX_BENEFIT } from "./pharmacy";
import { faker } from "@faker-js/faker";

describe("Pharmacy", () => {
  describe("Generic drug", () => {
    it("should decrease the benefit and expiresIn", () => {
      const expiresIn = faker.number.int({ min: 1, max: 99 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 1,
        max: MAX_BENEFIT,
      });

      const drug = new Drug("test", expiresIn, benefit);

      const expectedDrug = new Drug("test", expiresIn - 1, benefit - 1);

      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should decrease the benefit twice as fast after the expiration date", () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 2,
        max: MAX_BENEFIT,
      });
      const drug = new Drug("test", expiresIn, benefit);

      const expectedDrug = new Drug("test", expiresIn - 1, benefit - 2);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should decrease the benefit by 1 when the expiration date becomes ${MIN_BENEFIT}`, () => {
      const expiresIn = 1;
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 1,
        max: MAX_BENEFIT,
      });
      const drug = new Drug("test", expiresIn, benefit);

      const expectedDrug = new Drug("test", expiresIn - 1, benefit - 1);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not decrease the benefit below ${MIN_BENEFIT}`, () => {
      const expiresIn = faker.number.int({ min: 1, max: 99 });
      const benefit = MIN_BENEFIT;
      const drug = new Drug("test", expiresIn, benefit);

      const expectedDrug = new Drug("test", expiresIn - 1, benefit);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not decrease the benefit below ${MIN_BENEFIT} when it should decrease by 2`, () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = MIN_BENEFIT + 1;
      const drug = new Drug("test", expiresIn, benefit);

      const expectedDrug = new Drug("test", expiresIn - 1, 0);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });
  });
});
