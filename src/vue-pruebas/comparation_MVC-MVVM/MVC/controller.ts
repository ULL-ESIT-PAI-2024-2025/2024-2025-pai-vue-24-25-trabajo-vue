// controller.ts (compilado a controller.js)
class Model {
  name = '';
}

class Controller {
  private model = new Model();

  constructor() {
    const input = document.getElementById('nameInput') as HTMLInputElement;
    const greeting = document.getElementById('greeting') as HTMLElement;

    input.addEventListener('input', () => {
      this.model.name = input.value;
      greeting.textContent = `Hola, ${this.model.name}`;
    });
  }
}

new Controller();
