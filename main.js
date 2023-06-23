class Animal {
    constructor(nombre) {
      this.nombre = nombre;
    }

    sonido() {
      console.log("Haciendo sonido genérico");
    }
  }

  class Perro extends Animal {
    sonido() {
      console.log("Guau guau!");
    }
  }

  class Gato extends Animal {
    sonido() {
      console.log("Miau miau!");
    }
  }

  class Vaca extends Animal {
    sonido() {
      console.log("Muu muu!");
    }
  }

  // Función que hace sonar a un animal
  function hacerSonarAnimal(animal) {
    animal.sonido();
  }

  // Crear instancias de diferentes animales
  const perro = new Perro("Firulais");
  const gato = new Gato("Garfield");
  const vaca = new Vaca("Bella");

  // Hacer sonar a los animales
  hacerSonarAnimal(perro); // Output: "Guau guau!"
  hacerSonarAnimal(gato); // Output: "Miau miau!"
  hacerSonarAnimal(vaca); // Output: "Muu muu!"