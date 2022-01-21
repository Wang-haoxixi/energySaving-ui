export default {
  methods: {
    getYearWeek(time) {
      if (time === "0") {
        return "";
      }
      const d1 = new Date(time);
      const y = d1.getFullYear();
      const d2 = new Date(y, 0, 1);
      const d = Math.round((d1.valueOf() - d2.valueOf()) / 86400000);
      return Math.ceil((d + (d2.getDay() + 1) - 1) / 7);
    },
  },
};