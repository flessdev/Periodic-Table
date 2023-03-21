let lista = []
let comprobar_list = []
let con = 0

const $ = (s,q=0) =>  document.querySelectorAll(s)[q]
let ahora;
let c = 0
let x = 0
let nc = 0
let na = ""
//
for (let i=0; i < 118; i++){
  let e = $(".elemento",i)
  e.onclick  = comprobar
  e.id = e.textContent
  lista.push(e.textContent, i + 1)
  e.textContent = e.getAttribute("num")
}
function comprobar(){
  con++
  for (let i = 0; i < 118; i++) {
    let e = $(".elemento", i)
    e.onclick = null
  }
  ahora = this
  this.classList.add('seleccionado')
  
  if(this.id == $("#simbolo").innerHTML){
    this.onclick = null
    $("audio").play()
    c++
    $(".number").innerHTML = c
    comprobar_list.push(`${na} ${this.innerHTML} Correcto`)
    this.innerHTML = $("#simbolo").innerHTML
    this.style.border = "3px solid green"
    this.classList.add("l")
  }
  else{
    $("audio",1).play()
    for(let i = 0; i < 118; i++){
      if($(".elemento",i).id == $("#simbolo").innerHTML){
        comprobar_list.push(`${na} ${this.innerHTML} Incorrecto ${$(".elemento",i).innerHTML}`)
        $(".elemento",i).innerHTML = $("#simbolo").innerHTML
        $(".elemento",i).onclick = ""
        $(".elemento",i).classList.add("seleccionado2")
        $(".elemento",i).classList.add("l")
        $(".elemento",i).style.border = "3px solid red"
        $(".elemento",i).onclick = null
      }
    }
    
    nc++
    $(".number",1).innerHTML = nc
  }
  for (let i = 0; i < 118 * 2; i++) {
    if(lista[i] == $("#simbolo").innerHTML){
      lista.splice(i, 2)
      break
    }
  }
  let le = 0
  for(let i = 0; i < lista.length; i++ ){
    if(lista[i]) le++
  }
  if(le==0){
    final()
  }
  else{
    setTimeout(escoger, 500)
  }
}

function escoger(){
  for (let i = 0; i < 118; i++) {
    let e = $(".elemento", i)
    if(!e.classList.contains("l")){
      e.onclick = comprobar
    }
  }
  for (let i = 0; i < 118; i++) {
    if ($(".elemento", i).classList.contains("seleccionado")){
      $(".elemento",i).classList.remove("seleccionado")
    }
    else{
      $(".elemento", i).classList.remove("seleccionado2")
    }
  }
  if(x){
  ahora.style.width = 35 + "px"
  ahora.style.height = 35 + "px"
  }
  x++
  o = Math.floor(Math.random() * lista.length)
  $("#simbolo").textContent = parseInt(lista[o]) ? lista[o+1] : lista[o]
  
  while($("#simbolo").textContent == ""){
    o = Math.floor(Math.random() * lista.length)
    $("#simbolo").textContent = parseInt(lista[o]) ? lista[o + 1] : lista[o]
  }
  
  let el;
  for (let i = 0; i < 118; i++) {
    if ($(".elemento", i).id == $("#simbolo").innerHTML) {
      el = $(".elemento", i)
    }
  }
  $("#name").textContent = el.getAttribute("nombre")
  
  na = `${$("#name").textContent}&nbsp;(${$("#simbolo").textContent})`
  
}
escoger()

function final(){
  $("#tabla_periodica").innerHTML = `<div id="comprobar" align="center">
        <div id="co">
        <img src="IMG/correcto.svg" width="40px"> <span id="correctos">${c}</span>
        </div>
        <div id="inco">
        <img src="IMG/incorrecto.svg" width="40px"> <span id="incorrectos">${nc}</span>
        </div>
      </div>
      <div id="lista">
       </div>
       <div id="clicked">
       </div>
       <center id="kl">
        <button onclick="otra_vez()">Comenzar de nuevo</button>
        </center>
      `
  for(let i = 0; i < comprobar_list.length; i++){
    let l = []
    let img = "IMG/"
    let nuevo = document.createElement("div")
    let  tu = comprobar_list[i].split(" ")[1]
    let correcto = ""
    if(comprobar_list[i].split(" ").length == 3){
      p = "correcto"
      img += "correcto_comprobar.svg"
    }
    else{
      p = "incorrecto"
      img += "incorrecto_comprobar.svg"
      correcto = comprobar_list[i].split(" ")[3]
      
    }
    nuevo.classList.add("item")
    nuevo.classList.add(p)
    nuevo.onclick = click
    nuevo.innerHTML = `<div class="info">
    <div class="puesto">${i + 1}</div> <div class="nombre">${comprobar_list[i].split(" ")[0]}</div><div class="tu">${tu}</div><div class="ima"><img class="img" src="${img}" width="10px"></div> <div class="si">${correcto}</div>`
    
    $("#lista").appendChild(nuevo)
  }
  $("#lista .item:nth-child(1)").classList.add("cl")
  let clase = $("#lista .item:nth-child(1)").querySelector("img").getAttribute("src").replace("IMG/","").replace("_comprobar.svg","")
  let estado = `¡${clase.replace(clase[0],clase[0].toUpperCase())}!`
  clase += "_t"
  let r_correcto = $("#lista .item:nth-child(1)").querySelector(".si").innerHTML
  let r_tu = $("#lista .item:nth-child(1)").querySelector(".tu").innerHTML
  
  $("#clicked").innerHTML = `<center>
      <div id="cuadrado2">
        <center>
          <br>
          <div id="simbolo2">${$("#lista .item:nth-child(1)").querySelector(".nombre").innerHTML.split("&nbsp;")[1].replace("(","").replace(")","")}</div>
          <div id="name2">${$("#lista .item:nth-child(1)").querySelector(".nombre").innerHTML.split("&nbsp;")[0]}</div>
        </center>
        
      </div>
      <div id="info_el">
                <br>
                <h2 id="estado" class="${clase}">${estado}</h2>
                <br>
                <div id="tu_r">Tú Respuesta: ${r_tu} </div>
                          
                <div id="r_co">Respuesta Correcta: ${r_correcto == "" ? r_tu : r_correcto}</div>
              </div>
      </center>`
  
  
  
}


//setTimeout(final,1000)
function click(){
  let clase = this.querySelector("img").getAttribute("src").replace("IMG/","").replace("_comprobar.svg","")
  let estado = `¡${clase.replace(clase[0],clase[0].toUpperCase())}!`
  clase += "_t"
  let r_correcto = this.querySelector(".si").innerHTML
  let r_tu = this.querySelector(".tu").innerHTML
  $("#clicked").innerHTML = `<center>
      <div id="cuadrado2">
        <center>
          <br>
          <div id="simbolo2">${this.querySelector(".nombre").innerHTML.split("&nbsp;")[1].replace("(","").replace(")","")}</div>
          <div id="name2">${this.querySelector(".nombre").innerHTML.split("&nbsp;")[0]}</div>
          
          
        </center>
        </div>
        <div id="info_el">
          <br>
          <h2 id="estado" class="${clase}">${estado}</h2>
          <br>
          <div id="tu_r">Tú Respuesta: ${r_tu} </div>
          <div id="r_co">Respuesta Correcta: ${r_correcto == "" ? r_tu : r_correcto}</div>
        </div>
      </center>`
      for (let i = 0; i < document.querySelectorAll("#lista .item").length ; i++) {
        let e = $("#lista .item", i)
        e.classList.remove("cl")
      }
      this.classList.add("cl")
  
}
function otra_vez(){
  window.location = "index.html"
}