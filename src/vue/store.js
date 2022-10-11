import { reactive } from "vue";

export const store = reactive({
  count: 0,
  increment() {
    if (this.count <= 1) {
      this.count++;
    }
  },
});

export const showInfo = reactive({
  show: false,
  switch() {
    this.show = this.show ? false : true;
  },
});
