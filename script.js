class Quiz{
  constructor(formulario,id){
    this.id = id;
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
  deleteQuiz(param,id){
     console.log(param.parentNode.parentNode.parentNode);
    this.quizes = [...this.quizes].filter((e,i) => e.id != id );
    param.parentNode.parentNode.parentNode.className = "";
    param.parentNode.parentNode.parentNode.innerHTML = "";
    console.log(quizManager.quizes);
  }
}
const form = document.getElementById("task-form");
const quizManager = new QuizManager();
const quizLista = document.getElementById("quiz-list");
let id = 0;
form.addEventListener("submit", (ev) => {
  ev.preventDefault()
  const quiz = new Quiz(form,id);
  quizManager.addQuiz(quiz);
  console.log(quizManager.quizes);
  quizRender(form);
  id++;
  form.reset();
});
function quizRender(param){
  quizLista.innerHTML += `
    <div class = "col-md-4">
      Pregunta : ${param.pregunta.value}
      <form id = "formulario${quizManager.quizes[quizManager.quizes.length - 1].id}">
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
        <div>
          <button type = "button" class = "btn btn-warning" >Editar</button>
          <button type = "button" class = "btn btn-danger" onclick = "eliminar(this)">Eliminar</button>
        </div>
      </form>
    </div>
  `;
}
function generarid(param){
  return parseInt(param.parentNode.parentNode.getAttribute("id").match(/[0-9]/gi))
}
function Editar (param){

}
function eliminar(param){
  let id = generarid(param);
  quizManager.deleteQuiz(param,id);
}
function verificar(param){
  let id = generarid(param);
  let quiz = quizManager.quizes.find(e => e.id == id);
  quiz.responder(); 
  if(quiz.correcta == param.value){
    alert("respuesta correcta");
  }
  else{
    alert("respuesta incorrecta");
  } 
  [...param.parentNode.parentNode].map(e => {
      if(e.type != "button"){
        e.disabled = "true";
      }
      
    })
  console.log(quizManager);
}