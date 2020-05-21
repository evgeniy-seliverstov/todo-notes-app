/* Валидация форм (variable - валидируемая переменная, arrayConditions - массив условий)*/
export default {
  methods: {
    validate(variable, arrayConditions) {
      let res = true;
      arrayConditions.forEach(check => {
        if (res === true) {
          res = check(variable);
        }
      });
      return res;
    }
  }
}