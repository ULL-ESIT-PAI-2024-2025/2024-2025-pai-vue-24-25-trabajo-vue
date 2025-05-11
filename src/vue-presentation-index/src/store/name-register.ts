/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Web
 * 
 * @author: Jose Angel Portillo Garcia
 * @file: name-register.ts
 * @description: Componente de vue y pinia que permite almacenar y mantener estados de ref
 * @date: 10 MAY 2025
 */

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