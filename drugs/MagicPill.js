import { GenericDrug } from "./GenericDrug";

export class MagicPill extends GenericDrug {
  update() {
    // MagicPill never expires or decreases in benefit
  }
}
