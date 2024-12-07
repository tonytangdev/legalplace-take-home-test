import { GenericDrug } from "./GenericDrug";
export class Dafalgan extends GenericDrug {
  computeValueToAddToBenefit() {
    return super.computeValueToAddToBenefit() * 2;
  }
}
