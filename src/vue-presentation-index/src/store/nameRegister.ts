import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegisterStore = defineStore('register', () => {
  const name = ref('');
  const surname = ref('');
  const age = ref(0)
  const saveRegister = (inputName: string, inputSurname: string, inputAge: number) => {
    name.value = inputName;
    surname.value = inputSurname;
    age.value = inputAge;
  }
  return {name, surname, age, saveRegister}
})