import { reactive } from "vue";

export const currentYear = reactive({
  currentYear: 2010,
  increment(value) {
    if (this.currentYear <= 2050 && this.currentYear >= 1950) {
      this.currentYear += value;
    }
  },
});
