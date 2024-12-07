import { GenericDrug } from "./GenericDrug";

export class MagicPill extends GenericDrug {
  updateBenefit() {
    // MagicPill never expires or decreases in benefit
  }
}
