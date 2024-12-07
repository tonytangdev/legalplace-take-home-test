import { Fervex, GenericDrug, HerbalTea, MagicPill } from "./drugs";
import { Pharmacy, MIN_BENEFIT, MAX_BENEFIT } from "./pharmacy";
import { faker } from "@faker-js/faker";

describe("Pharmacy", () => {
  describe.only("Generic drug", () => {
    it("should decrease the benefit and expiresIn", () => {
      const expiresIn = faker.number.int({ min: 1, max: 99 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 1,
        max: MAX_BENEFIT,
      });

      const drug = new GenericDrug("test", expiresIn, benefit);

      const expectedDrug = new GenericDrug("test", expiresIn - 1, benefit - 1);

      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should decrease the benefit twice as fast after the expiration date", () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 2,
        max: MAX_BENEFIT,
      });
      const drug = new GenericDrug("test", expiresIn, benefit);

      const expectedDrug = new GenericDrug("test", expiresIn - 1, benefit - 2);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should decrease the benefit by 1 when the expiration date becomes ${MIN_BENEFIT}`, () => {
      const expiresIn = 1;
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 1,
        max: MAX_BENEFIT,
      });
      const drug = new GenericDrug("test", expiresIn, benefit);

      const expectedDrug = new GenericDrug("test", expiresIn - 1, benefit - 1);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not decrease the benefit below ${MIN_BENEFIT}`, () => {
      const expiresIn = faker.number.int({ min: 1, max: 99 });
      const benefit = MIN_BENEFIT;
      const drug = new GenericDrug("test", expiresIn, benefit);

      const expectedDrug = new GenericDrug("test", expiresIn - 1, benefit);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not decrease the benefit below ${MIN_BENEFIT} when it should decrease by 2`, () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = MIN_BENEFIT + 1;
      const drug = new GenericDrug("test", expiresIn, benefit);

      const expectedDrug = new GenericDrug("test", expiresIn - 1, 0);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });
  });

  describe.only("Herbal Tea", () => {
    it("should increase the benefit and expiresIn", () => {
      const expiresIn = faker.number.int({ min: 2, max: 99 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT + 1,
        max: MAX_BENEFIT - 1,
      });
      const drug = new HerbalTea("Herbal Tea", expiresIn, benefit);

      const expectedDrug = new HerbalTea(
        "Herbal Tea",
        expiresIn - 1,
        benefit + 1,
      );
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should increase the benefit twice as fast after the expiration date", () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 2,
      });
      const drug = new HerbalTea("Herbal Tea", expiresIn, benefit);

      const expectedDrug = new HerbalTea(
        "Herbal Tea",
        expiresIn - 1,
        benefit + 2,
      );
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should increase the benefit by 1 when the expiration date becomes 0", () => {
      const expiresIn = 1;
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 2,
      });
      const drug = new HerbalTea("Herbal Tea", expiresIn, benefit);

      const expectedDrug = new HerbalTea(
        "Herbal Tea",
        expiresIn - 1,
        benefit + 1,
      );
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not increase the benefit above ${MAX_BENEFIT}`, () => {
      const expiresIn = faker.number.int({ min: 2, max: 99 });
      const benefit = MAX_BENEFIT;
      const drug = new HerbalTea("Herbal Tea", expiresIn, benefit);

      const expectedDrug = new HerbalTea("Herbal Tea", expiresIn - 1, benefit);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not increase the benefit above ${MAX_BENEFIT} when it should increase by 2`, () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = MAX_BENEFIT - 1;
      const drug = new HerbalTea("Herbal Tea", expiresIn, benefit);

      const expectedDrug = new HerbalTea(
        "Herbal Tea",
        expiresIn - 1,
        MAX_BENEFIT,
      );
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });
  });

  describe.only("Magic Pill", () => {
    it("should not change the benefit and expiresIn", () => {
      const expiresIn = faker.number.int({ min: -99, max: 99 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT,
      });
      const drug = new MagicPill("Magic Pill", expiresIn, benefit);

      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([drug]);
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit by 1 when expiresIn is greater than 10", () => {
      const expiresIn = faker.number.int({ min: 11, max: 99 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 1,
      });
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, benefit + 1);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should increase the benefit by 2 when expiresIn is between 6 and 10", () => {
      const expiresIn = faker.number.int({ min: 6, max: 10 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 2,
      });
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, benefit + 2);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should increase the benefit by 3 when expiresIn is between 1 and 5", () => {
      const expiresIn = faker.number.int({ min: 1, max: 5 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 3,
      });
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, benefit + 3);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should set the benefit to ${MIN_BENEFIT} when expiresIn is 0 or less`, () => {
      const expiresIn = faker.number.int({ min: -99, max: 0 });
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 3,
      });
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, 0);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it("should increase the benefit by 3 when expiresIn becomes 0", () => {
      const expiresIn = 1;
      const benefit = faker.number.int({
        min: MIN_BENEFIT,
        max: MAX_BENEFIT - 3,
      });
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, benefit + 3);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not increase the benefit above ${MAX_BENEFIT} when it should increase by 2`, () => {
      const expiresIn = faker.number.int({ min: 6, max: 10 });
      const benefit = MAX_BENEFIT - 1;
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, MAX_BENEFIT);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });

    it(`should not increase the benefit above ${MAX_BENEFIT} when it should increase by 3`, () => {
      const expiresIn = faker.number.int({ min: 1, max: 5 });
      const benefit = MAX_BENEFIT - 1;
      const drug = new Fervex("Fervex", expiresIn, benefit);

      const expectedDrug = new Fervex("Fervex", expiresIn - 1, MAX_BENEFIT);
      expect(new Pharmacy([drug]).updateBenefitValue()).toEqual([expectedDrug]);
    });
  });
});
