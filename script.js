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
    this.quizes = [...this.quizes].filter((e,i) => e.id != id );
    if(this.quizes.length == 0){
      param.parentNode.parentNode.parentNode.parentNode.innerHTML = "";
    }
    else{
      param.parentNode.parentNode.parentNode.className = "";
      param.parentNode.parentNode.parentNode.innerHTML = "";
    }
    
    
  }
  editQuiz(param){
    this.quizes.find((e, i) => {
      if(e.id == param.detec.value){
        this.quizes[i].pregunta = param.pregunta.value
        this.quizes[i].a = param.a.value
        this.quizes[i].b = param.b.value
        this.quizes[i].c = param.c.value
        this.quizes[i].d = param.d.value
        this.quizes[i].correcta = param.correcta.value
        return
      }
    })
  }
}
const form = document.getElementById("task-form");
const form1 = document.getElementById("edit-form");
const contenedor = document.getElementById("cont-normal");


const quizManager = new QuizManager();
const quizLista = document.getElementById("quiz-list");
let id = 0;
form.addEventListener("submit", (ev) => {
  ev.preventDefault()
  const quiz = new Quiz(form,id);
  quizManager.addQuiz(quiz);
  console.log(quizManager.quizes);
  quizRender(form);
  form.reset();
  id++;
});
form1.addEventListener("submit", (ev) => {
  ev.preventDefault()
  let target = ev.target;
  quizManager.editQuiz(target);
  quizRender(form1, form1.detec.value);
  form1.reset();
});
function quizRender(param, id = null){
  if(id == null){
    quizLista.innerHTML += `
    <div class = "col-md-2 pasar">
      
      <form id = "formulario${quizManager.quizes[quizManager.quizes.length - 1].id}">
      Pregunta : <span id = "preg"> ${param.pregunta.value}</span>
        <div style = "display:block"> 
          <label id = "a">A: ${param.a.value}</label>
          <input type = "radio" name = "respuesta" value="a" onchange = "verificar(this)">
        </div>
        <div style = "display:block">
          <label id = "b">B: <span  id = "b"> ${param.b.value} </span> </label>
          <input type = "radio" name = "respuesta" value="b" onchange = "verificar(this)" >
        </div>
        <div style = "display:block">
          <label id = "c">C: <span  id = "c"> ${param.c.value} </span> </label>
          <input type = "radio" name = "respuesta" value="c" onchange = "verificar(this)" >
        </div>
        <div style = "display:block">
          <label id = "d">D: <span  id = "d">${param.d.value} </span> </label>
          <input type = "radio" name = "respuesta" value="d" onchange = "verificar(this)">
        </div>
        <div>
          <button type = "button" class = "btn btn-warning" onclick = "editar(this)" >Editar</button>
          <button type = "button" class = "btn btn-danger" onclick = "eliminar(this)">Eliminar</button>
        </div>
      </form>
    </div>
  `;
  }else{
    console.log(id);
    let elemento = document.getElementById(`formulario${id}`);
    elemento.childNodes[1].innerHTML = param.pregunta.value
    console.log(elemento.childNodes);
    elemento.childNodes[3].childNodes[1].innerHTML = `A: ${param.a.value}`;
    elemento.childNodes[5].childNodes[1].innerHTML = `B: ${param.b.value}`;
    elemento.childNodes[7].childNodes[1].innerHTML = `C: ${param.c.value}`;
    elemento.childNodes[9].childNodes[1].innerHTML = `D: ${param.d.value}`;
  }
  
}
function verQuiz(el){
  if(contenedor.style.display == "none"){
    contenedor.style.display = "flex";
  }else{
    contenedor.style.display = "none";

  }
  
  let botones = document.getElementsByTagName("button");
  botones = [...botones];
  botones.map(e => {
    if(e.style.display == "none"){
      e.style.display = "block"
    }else{
      e.style.display = "none";

    }

  })
}
function generarid(param){
  return parseInt(param.parentNode.parentNode.getAttribute("id").match(/[0-9]/gi))
}
function editar (param){
  let id = document.getElementById("detec");
  id.value = generarid(param);
  document.getElementById("contenedor_hidden-quiz").style.display = "flex";
  document.getElementById("cont-normal").style.display = "none";
}
function volver(){
  document.getElementById("contenedor_hidden-quiz").style.display = "none";
  document.getElementById("cont-normal").style.display = "flex";
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
}