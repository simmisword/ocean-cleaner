import { reactive } from "vue";
import { microTable, macroTable } from "./data";

const MICRO_TRASH_MAX = microTable[2050]["growth"];
const MACRO_TRASH_MAX = macroTable[2050]["growth"];

export class Trashstore {
  constructor() {
    this.MICRO_TRASH_MAX = MICRO_TRASH_MAX;
    this.MACRO_TRASH_MAX = MACRO_TRASH_MAX;
    this.trashfactor = reactive({
      micro: 0,
      macro: 0,
      update(year, mode) {
        this.micro = getMicroTrashFactor(year, mode);
        this.macro = getMacroTrashFactor(year, mode);
      },
    });
  }
}

function getMicroTrashFactor(year, mode) {
  if (year <= 2020) {
    return microTable[year] / MICRO_TRASH_MAX;
  } else if (year <= 2050) {
    return microTable[year][mode] / MICRO_TRASH_MAX;
  }
}

function getMacroTrashFactor(year, mode) {
  if (year <= 2020) {
    return macroTable[year] / MACRO_TRASH_MAX;
  } else if (year <= 2050) {
    return macroTable[year][mode] / MACRO_TRASH_MAX;
  }
}
