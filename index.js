import { Fervex, GenericDrug, HerbalTea, MagicPill } from "./drugs";
import { Pharmacy } from "./pharmacy";

import fs from "fs";

const drugs = [
  new GenericDrug("Doliprane", 20, 30),
  new HerbalTea("Herbal Tea", 10, 5),
  new Fervex("Fervex", 12, 35),
  new MagicPill("Magic Pill", 15, 40),
];
const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
