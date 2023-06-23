class Quiz{
  constructor(formulario){
    this.pregunta = formulario.pregunta.value;
    this.a = formulario.a.value;
    this.b = formulario.b.value;
    this.c = formulario.c.value;
    this.d = formulario.c.value;
    this.correcta = formulario.correcta.value;
    this.respondida = false;
  }
  responder(){
    this.respondida = true;
  }
}
class QuizManager{
  constructor(){
    this.quizes = [];
  }
   addQuiz(param){
    this.quizes.push(param)
  }
}
const form = document.getElementById("task-form");
const quizManager = new QuizManager();
const quizLista = document.getElementById("quiz-list");
form["subir"].addEventListener("click", (ev) => {
  ev.preventDefault()
  const quiz = new Quiz(form);
  quizManager.addQuiz(quiz);
  console.log(quizManager.quizes);
  quizRender(form);
  form.reset();
});
function quizRender(param){
  quizLista.innerHTML += `
    <div>
      Pregunta : ${param.pregunta.value}
      <form id = "formulario${quizManager.quizes.length}">
        <div style = "display:block"> 
          <label>A: ${param.a.value} </label>
          <input type = "radio" name = "respuesta" value="a" onchange = "verificar(this)">
        </div>
        <div style = "display:block">
          <label>B: ${param.b.value} </label>
          <input type = "radio" name = "respuesta" value="b" onchange = "verificar(this)" >
        </div>
        <div style = "display:block">
          <label>C: ${param.c.value} </label>
          <input type = "radio" name = "respuesta" value="c" onchange = "verificar(this)" >
        </div>
        <div style = "display:block">
          <label>D: ${param.d.value} </label>
          <input type = "radio" name = "respuesta" value="d" onchange = "verificar(this)">
        </div>
      </form>
    </div>
  `;
}
function verificar(param){
  let id = parseInt(param.parentNode.getAttribute("id").match(/[0-9]/gi)) - 1;
  quizManager.quizes[id].responder(); 
  console.log(param.value);
  if(quizManager.quizes[id].correcta == param.value){
    alert("respuesta correcta");
  }
  else{
    alert("respuesta incorrecta");
  } 
  [...param.parentNode].map(e => {
      e.disabled = "true";
    })
  console.log(quizManager);
}