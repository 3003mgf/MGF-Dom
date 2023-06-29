var boton =  document.querySelector("#burger")

var panel = document.querySelector("#panel")

let clockTempo;
let alarm;
let $audio = document.createElement("audio");
$audio.src = "Assets/SUPERNATURAL.wav"


if('serviceWorker' in navigator){  //Esto es para ver si soporta el service worker nuestro navegador.
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log("Registro de service worker exitoso", reg))
    .catch(err => console.warn("Error al tratar de registrar el service worker", err))
}



//BOTON HAMBURGUESA  -  WATCH & ALARM

document.addEventListener("click", e=>{
    if(e.target.matches("#burger") || e.target.matches(`${"#burger"} *`)){
        panel.classList.toggle("is-active");
        boton.classList.toggle("is-active")  //Esta es la clase del boton hamburguesa que ya venia definido asi desde la libreria.
    }

    if(e.target.matches(".menu a")){
        panel.classList.toggle("is-active")
        boton.classList.toggle("is-active")
    }

    if(e.target.matches("#boton1-section-1")){

        document.querySelector("#boton2-section-1").disabled = false;
        document.querySelector("#boton3-section-1").disabled = false;
        document.querySelector("#boton4-section-1").disabled = false;
        document.querySelector("#boton1-section-1").disabled = true;

        clockTempo = setInterval(() =>{    //Ponemos en una variable para despues poder eliminar el setInterval                             

            let clock = new Date().toLocaleTimeString();
            document.querySelector("#reloj").innerHTML = `<h3> ${clock} </h3>`;
            
        }, 1000)
    }

    if(e.target.matches("#boton2-section-1")){
        document.querySelector("#boton1-section-1").disabled = false;
        document.querySelector("#boton3-section-1").disabled = false;
        document.querySelector("#boton4-section-1").disabled = false;
        
        
        clearInterval(clockTempo);
        document.querySelector("#reloj").innerHTML = null;      //El clearInterval() para el setInterval, pero el innerHTML limpia el set que quedo.

    }
    

    if(e.target.matches("#boton3-section-1")){
        document.querySelector("#boton2-section-1").disabled = false;
        document.querySelector("#boton1-section-1").disabled = false;
        document.querySelector("#boton4-section-1").disabled = false;
        document.querySelector("#boton3-section-1").disabled = true;
        
    
        alarm = setTimeout(()=>{   //Otra vez guardamos en una variable para despues poder eliminar el set.
              $audio.play();       //Lo hicimos creando un elemento <audio> con createElement.

        }, 0)
    }
    

    if(e.target.matches("#boton4-section-1")){
        document.querySelector("#boton2-section-1").disabled = false;
        document.querySelector("#boton3-section-1").disabled = false;
        document.querySelector("#boton1-section-1").disabled = false;

        
        clearTimeout(alarm);        //Borramos el Timeout del boton 3.
        $audio.pause();             //Y pausamos el audio, aunque el audio se pausara al borrarse el Timeout.
    }

    
    
})









//EVENTOS DE TECLADO


//SHORTCUTS


let open;

document.addEventListener("keydown", e=>{
    if((e.shiftKey === true) && (e.key === 'A')){            //Creamos comandos, o shortcuts.
       open =  window.open("https://google.com");         
    }

    if((e.shiftKey) && (e.key === 'B')){
        open.close();

    }

})
    





//BALL MOVEMENT & COLISION

let x = 0;   //Aca creamos las variables afuera de la funcion para ir almacenando los resultados, como en las closures.
let y = 0;


function ballMove (e){

    let limitsBall = document.querySelector(".ball").getBoundingClientRect();
    let limitsStage = document.querySelector(".stage").getBoundingClientRect();

switch(e.keyCode){
    case 37:
        e.preventDefault(); //Detiene el comportamiento por defecto de la tecla 37.
        if(limitsBall.left > limitsStage.left) x--;  //Esto es para la colision
        if(limitsBall.left < limitsStage.left){
            window.open("https://www.youtube.com")
        };               
        break;

    case 38:
        e.preventDefault();
        if(limitsBall.top > limitsStage.top)y--;
        if(limitsBall.top < limitsStage.top){
            window.open("https://www.google.com")
        };

        break;

    case 39:
        e.preventDefault();
        if(limitsBall.right < limitsStage.right)x++;
        if(limitsBall.right > limitsStage.right){
            window.open("https://www.twitter.com")
        };
        break;

    case 40: 
        if(limitsBall.bottom < limitsStage.bottom)y++;
        if(limitsBall.bottom > limitsStage.bottom){
            window.open("https://www.gmail.com")
        }
        
        e.preventDefault();

        break;

    default:
        break;
}

document.querySelector(".ball").style.transform = `translate(${x*30}px,${y*30}px)`;
}




document.addEventListener("click", e=>{

    if(e.target.matches(".stage")){
          
        document.addEventListener("keydown", ballMove)

    }

    if(!e.target.matches(".stage")){
        document.removeEventListener("keydown", ballMove)
    }
})








//REGRESIVE COUNTER

let $counter = document.querySelector(".counter")
let date = "March 30, 2023 00:00:00"
let limitDate = new Date(date).getTime();  
let message = "Congrats! Happy Birthday, legend."


let countdown = setInterval(()=>{

let now = new Date().getTime();
let limitTime = (limitDate - now);

let days = Math.floor(limitTime / (1000 * 60 * 60 * 24));   
let hours = ("0" + Math.floor((limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
let minutes = ("0" + Math.floor((limitTime % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
let seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / (1000))).slice(-2);

$counter.innerHTML = `<h3> Faltan: ${days} dias, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

if(limitTime < 0){
   
    clearInterval(countdown);
    $counter.innerHTML = `<h3> ${message} </h3>`;
 
 }

}, 1000)
 







//SCROLL BUTTON

var scrollButton = document.querySelector(".scroll-top")

document.addEventListener("scroll", e=>{
    if(scrollY > 600 || document.documentElement.scrollTop > 400){
       scrollButton.classList.remove("hidden");
    }

    if(scrollY < 600 || document.documentElement.scrollTop < 400){
        scrollButton.classList.add("hidden")
    }
    
    
    // if(scrollY > 240){
    //     document.querySelector(".header").classList.add("hidden");
    // }else{
    //     document.querySelector(".header").classList.remove("hidden");
    // }
    
})



document.addEventListener("click", e=>{
    if(e.target.matches(".scroll-top")){
        scrollTo(0, 0);
    }

})


 





//DARK MODE BUTTON


let darkButton = document.querySelector(".dark");
let $selectors = document.querySelectorAll("[data-dark]"); 
let $header = document.querySelector(".header h1");
let $relojButtons = document.querySelector("#relojButtons").querySelectorAll("button");

let sun = "☀️";

let moon = "🌙";


const lightMode = () =>{

    $header.removeAttribute("style");
    $relojButtons.forEach(el => el.removeAttribute("style"));
    document.querySelector("#webcam").classList.add("video");

    $selectors.forEach(el => el.classList.remove("darkMode"));
    darkButton.textContent = moon;
    
}


const darkMode = () =>{

    $header.setAttribute("style", "color: #222;");
    $relojButtons.forEach(el => el.setAttribute("style", "color: blanchedalmond"));
    document.querySelector("#webcam").classList.remove("video");

    $selectors.forEach(el => el.classList.add("darkMode"));      //Para no poner cada clase que queremos cambiar, le agregamos un data-a a cada elemento que queremos cambiar.
    darkButton.textContent = sun;
    
}


    
document.addEventListener("click", e=>{

    if(e.target.matches(".dark")){
        
        if(darkButton.textContent === moon){

           darkMode();
           localStorage.setItem("theme", "dark");

        }else{

            lightMode();
            localStorage.setItem("theme", "light");
        }
    }
})










//Variables del responsive design - Tenemos que ponerlas aca para que esten antes del DOMContentLoaded.

let ytDiv = document.querySelector("#youtube"),
ytContent = `<iframe width="560" height="315" style = "border-radius: 2rem;" src="https://www.youtube.com/embed/s0dMTAQM4cw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

let mapsDiv = document.querySelector("#gmaps"),
mapsDivContent = `<iframe width="560" height="315" style = "border-radius: 2rem;" src="https://www.youtube.com/embed/HdPzOWlLrbE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

let mediaQuery = "(min-width: 1024px)";  //Tamaño de escritorio 
let breakPoint = window.matchMedia(mediaQuery);


//WebCam Variables:
let $video = document.querySelector("#webcam");





//LOCAL STORAGE 

//(ESTAMOS USANDO VARIABLES DE DARK MODE BUTTON)

document.addEventListener("DOMContentLoaded", e=>{     //Solo puede haber un DOMContentLoaded en el document
   
    if(localStorage.getItem("theme") === null){
        localStorage.setItem("theme", "light");
    }

    if(localStorage.getItem("theme") === "light"){
        lightMode();
    }


    if(localStorage.getItem("theme") === "dark"){
        darkMode();
    }




   
    // RESPONSIVE DESIGN 
    
    const responsive = (e) =>{
        if(e.matches){   //Esto quiere decir si el tamaño de la pagina matchea con el valor de la variable "mediaQuery".
            ytDiv.innerHTML = ytContent;
            mapsDiv.innerHTML = mapsDivContent;
        }else{
            ytDiv.innerHTML = `<a href = "https://youtu.be/s0dMTAQM4cw" style = "text-decoration-color: palevioletred; color: rgb(107, 101, 101);; font-weight: bold" > Watch AI intelligence video </a> `;
            mapsDiv.innerHTML = `<a href = "https://youtu.be/HdPzOWlLrbE" style = "text-decoration-color: palevioletred; color: rgb(107, 101, 101);; font-weight: bold" > Watch Universe Origin video </a> `;
        };
        // console.log(breakPoint, e.matches);
    }
    
    breakPoint.addListener(responsive);
    responsive(breakPoint);  //Esto lo hacemos para que cuando recargue la pagina automaticamente se ejecute la funcion.




    //WEBCAM

    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true, audio:false})    //Esto es una promesa
        .then((stream) =>{
            console.log(stream);         //El stream seria el mediaStream, es basicamente toda la informacion que envia la camara. El flujo.
            $video.srcObject = stream;   //Ponemos srcObject, porque  esto es una promesa, y dentro del then(), colocamos un objeto. then((obj) => {}. Entonces no podemos pasarle el source en string, si no un source como objeto. Y JS tiene este metodo para eso. srcObject
            $video.play();               //Debemos poner esto para que la camara este en vivo, de lo contrario solo mostraria una foto.
        })
        .catch((err) => {
            $video.insertAdjacentHTML("afterend", `<p class = "videoError" > User didn't allowed WebCam </p>`);
        });

        

       
    }



    //GEOLOCATION
    let $geoL = document.querySelector("#geolocation"); 
    let options = {
        
        enableHighAccuracy: true,      //Esta propiedad viene por default en false. Aca estamos activando la  precision alta. De todas formas esto dependera de nuestro internet, maquina, etc.
        timeout: 5000,                 //Cuanto tiempo va a estar esperando la lectura.
        maximumAge: 0                  //Esto es para que no tome como referencia la lectura anterior. 

    };

    const success = (position) =>{
        let coords = position.coords;
        // console.log(position);
        // console.log(position.coords);

        $geoL.innerHTML = `

        <p> Tu posicion actual es: </p>

        <ul className="geo-ul">
          <li> Latitud: <b> ${coords.latitude}</b></li>
          <br>
          <li> Longitud: <b> ${coords.longitude} </b></li>
          <br>
          <li> Accuracy: <b> ${coords.accuracy} </b>metros</li>
        </ul>
        <br>
        <br>
        <a class = "videoError" href= "https://www.google.com/maps/@${coords.latitude},${coords.longitude},20z" target = "_blank" rel = "noopener"> Watch location in Google Maps </a>

        `;
    };

    const error = (err) =>{
        console.log(err);
        $geoL.innerHTML =`<p class = "videoError"> User didn't allow geolocation </p>`
    };

    navigator.geolocation.getCurrentPosition(success, error, options);     //Un metodo alternativo es watchPosition, el cual nos permite ver los cambios de ubicacion. Es como un listener, que cuando detecta un cambio de posicion, lo actualiza.
    




    //NARRADOR DE VOZ

    narradorVoz();     //La funcion esta mas abajo.

})


//SEARCH FILTER

let inputCard = document.querySelector(".cardFilter");
let figureCards = document.querySelector(".cardFilter").querySelectorAll(".card");                 //Para realizar el search, vamos a utilizar el input y los figures, no el article.

document.addEventListener("keyup", e=>{
    if(e.target.matches(".cardFilter")){
        document.querySelectorAll(".card").forEach(el => (el.textContent.toLowerCase().includes(e.target.value.toLowerCase())) ? el.classList.remove("filter") : el.classList.add("filter"));
    }})       











//----------------------------RESPONSIVE TESTER----------------------------

let $form = document.querySelector("#responsive-tester")

let wOpen;



document.addEventListener("submit", e=>{            //Esta opcion es mas linda a la vista, pero menos practica, ya que tendriamos que separar la funcion en dos partes, o crear otro evento innecesario.
    if(e.target === $form){
        e.preventDefault();
        wOpen = window.open($form.URL.value, "wOpen", `innerWidth = ${$form.Width.value}, innerHeight = ${$form.Height.value}`);
    }
})

document.addEventListener("click", e=>{
    if(e.target === $form.Close){
        wOpen.close();
    }
})


/* -------- OPCION 2 ----------
//Para hacerlo tenemos quee cambiar le input Test a type button. De esta forma ahorramos crear otro event, salvo que tengamos pensado crear mas input type submit.


// document.addEventListener("click", e=>{
//     if(e.target === $form.Test){
//         if(!$form.URL.value){return alert("La URL esta vacia o es invalida")};
//         if(!$form.Width.value){return alert("Width is empty or invalid")};
//         if(!$form.Height.value){return  alert("Height is empty or invalid")};
//          e.preventDefault();
//         wOpen = window.open($form.URL.value, "wOpen", `innerWidth = ${$form.Width.value}, innerHeight = ${$form.Height.value}`);    
//     }

//     if(e.target === $form.Close){
//         wOpen.close();
//     }

    
// })

*/











// ---------------- NETWORK STATUS ----------------------------


const isOnline = () =>{

    if(!navigator.onLine){
        alert("Connection Lost")

    }else{
        alert("Connection Recovered")
    }
}


window.addEventListener("online", e=>{           //JS ya tiene estos eventos designados justamente para el network status.
  isOnline();
  document.querySelector("#network").innerHTML = `<h4> Connection Status: Online 😄 </h4>`
})

window.addEventListener("offline", e=>{
  isOnline();
  document.querySelector("#network").innerHTML = `<h4> Connection Status: Offline ☹️ </h4>`

})




//----------OPCION 2 ----------------
/*
// const $div = document.createElement("div");          //Solamente creamos una variable y 2 clases en CSS

// const isOnline = () =>{

//     if(!navigator.onLine){
         
//         $div.textContent = "Conexion Perdida";
//         $div.classList.add("offline");
//         $div.classList.remove("online");
    
//     }else{
//         $div.textContent = "Conexion Restablecida";
//         $div.classList.add("online");
//         $div.classList.remove("offline");
//     }

//     document.body.insertAdjacentElement("afterbegin", $div);
//     setTimeout(() => {document.body.removeChild($div)}, 3000);
    
//     }

// window.addEventListener("online", e=>{           
//     isOnline();
// })
      
// window.addEventListener("offline", e=>{
//     isOnline();
// })
       
*/





//SLIDER

let $next = document.querySelector(".next");
let $prev = document.querySelector(".prev");
let slides = document.querySelectorAll(".slider-slide");
let i = 0;   //Esto es para que cuando llegue a la ultima slide, regresar a la primera, para atras y adelante.

document.addEventListener("click", e=>{       //Esto iria al DOMContentLoaded creo
    if(e.target === $prev){
        e.preventDefault();
        slides[i].classList.remove("active");
        i--;
    
        if(i < 0){
           i = slides.length -1;
        };

        slides[i].classList.add("active");
    }

    if(e.target === $next){
        e.preventDefault();
        slides[i].classList.remove("active");
        i++;
        if(i > slides.length -1){
            i = 0;
        };
        slides[i].classList.add("active");
    }
})




// ------------------------------ SCROLL SPY -------------------------------

//Podemos resolverlo con la API llamada Intersection Observer. Esta misma es relativamente nueva, que lo que hace es detectar cuando en la parte visible del vw de nuestro ordenador se encuentra un elemento.
//Lo ponemos en una funcion para poder introducirlo al DOMContentLoaded

function scrollSpy(){
    const $sections = document.querySelectorAll("section[data-scroll-spy]");
    
    const cb = (entries) =>{             //Las entries son los elementos del sections.forEach
        entries.forEach((entry) => {    
            let id = entry.target.getAttribute("id");
            if(entry.isIntersecting){    //Esta propiedad muestra true si el elemento se ve.
                document.querySelector(`a[data-scroll-spy][href = "#${id}"]`).classList.add("active");
            }else{
                document.querySelector(`a[data-scroll-spy][href = "#${id}"]`).classList.remove("active");
            }
        });
    };
    
    const observer = new IntersectionObserver(cb, {
        //root: //Desde que elemento comienze el scrollSpy, si la omitimos actua en todo el documento
        rootMargin: "-410px"  //Root margin recibe 4 opciones, top, right, bottom, left. Al ponerle uno se aplica a todos los lados. Todo en el rango de 400px alrededor no lo va a tomar. Si pusieramos 400px, todo a 400px extra lo tomaria.
        // threshold: 0.5,
    });
    
    $sections.forEach((el) => observer.observe(el));     //Aca le estamos diciendo: A cada elemento de sections, observalo.
    }
    
scrollSpy();


// -------------------------- VIDEO INTELIGENTE --------------------------------

const $videoI = document.querySelectorAll("video[data-smart-video]");   //Para usar Intersection Observer conviene usar data attributes.

const cb = (entries) =>{             
    entries.forEach((entry) => {    
       
        if(entry.isIntersecting){ 
            document.querySelector(".videoI").play();  
        }else{
            document.querySelector(".videoI").pause();  

        }

        document.addEventListener("visibilitychange", e=>{
            document.visibilityState === "visible"  ?  entry.target.play() : entry.target.pause();     //Esto es para que si salimos de la ventana, pause el video, y nosotros al volver tengamos el video donde estaba cuando nos fuimos.
        })
    });
};

const observer = new IntersectionObserver(cb, {
    threshold: 0.5,
});
    

$videoI.forEach((el) => observer.observe(el));     






/*//-------------------- HOVER & OVER ------------------
// document.addEventListener("pointerover", e=>{

//     if(e.target.matches(".videoI")){
//         document.querySelector(".videoI").play();
//     }
//     if(!e.target.matches(".videoI")){
//         document.querySelector(".videoI").pause();
//       }
// })
*/







/*----PARA CARGAR EL RESPONSE DE FORMS

// let comment = document.createElement("p");
// comment.innerHTML = `<p> We received your comment! </p>`;

// document.addEventListener("click", e=>{
//     if(e.target === document.querySelector(".form input[type='submit'")){
//         document.querySelector(".form-loader").classList.remove("none");
//         document.querySelector(".form legend").classList.add("none");

//         setTimeout(()=>{
//             document.querySelector(".form-loader").classList.add("none");
//             document.querySelector(".form-response").classList.remove("none");

//         },3000)
        
        
//     }
// })

*/







//-------------------------- VALIDACION FORMULARIO ----------------------------------

function validacionForms(){
let $formValidation = document.querySelector(".form");
let $inputs = $formValidation.querySelectorAll("input[required], textarea[required]");


// console.log($inputs)

$inputs.forEach((el) =>{
    const span = document.createElement("span");
    span.id = el.name; 
    span.classList.add("form-error", "none");
    // span.classList.add("none");
    span.textContent = el.title;
    el.insertAdjacentElement("afterend", span);

})

document.addEventListener("keyup", e=>{
    if(e.target.matches(".form [required]")){
        let input = e.target;
        let pattern = input.pattern || input.dataset.pattern;
        if(pattern && input.value !== ""){
            let regex = new RegExp(pattern);
            return !regex.exec(input.value) ? document.getElementById(input.name).classList.add("is-active")
            : document.getElementById(input.name).classList.remove("is-active");
        }
        if(!pattern){
            return input.value === "" ?  document.getElementById(input.name).classList.add("is-active") 
            : document.getElementById(input.name).classList.remove("is-active");
        }
    }
    
})
}

validacionForms();




//--------------------------ENVIO DE FORMULARIO -------------------------

document.addEventListener("submit", e=>{
        //e.preventDefault();
        document.querySelector(".form-loader").classList.remove("none");
        document.querySelector(".form legend").classList.add("none");

        setTimeout(()=>{
            document.querySelector(".form-loader").classList.add("none");
            document.querySelector(".form-response").classList.remove("none");
            document.querySelector(".form").reset();
        },2000)
        
})



//---------------------NARRADOR DE VOZ -------------------------
//La funcion esta ejecutada en el DOMContentLoaded

function narradorVoz(){

let $speechSelect = document.querySelector("#speech-select"),
$speechSelectBtn = document.querySelector("#speech-btn"),
$speechTextArea = document.querySelector("#speech-text");

let speechMessage = new SpeechSynthesisUtterance();  


//let voices = [];               En el caso de que no funcione en algunos navegadores hacerlo de la manera comentada.

let voices = window.speechSynthesis.getVoices();           //Nos devuelve las voces disponibles en el sistema

//document.addEventListener("DOMContentLoaded", e=>{                     Lo comento porque la funcion ya iria en el DOMContentLoaded principal.
//voices = window.speechSynthesis.getVoices();    
voices.forEach((el) =>{
    // console.log(el)
    let elemento = document.createElement("option");
    elemento.value = `${el.name}`;
    elemento.textContent = `${el.name} - ${el.lang}`;
    $speechSelect.appendChild(elemento);
})

document.addEventListener("change", e=>{
if(e.target === $speechSelect){
speechMessage.voice = voices.find(el => el.name === e.target.value);
}
// console.log(speechMessage);
})


document.addEventListener("click", e=>{
    if(e.target === $speechSelectBtn){
        speechMessage.text = $speechTextArea.value;           //El .text es una propiedad del SpeeechSynthesisUtterance()
        speechSynthesis.speak(speechMessage);                 //Va a tomar la propiedad text de speechMessage.
    }
})

// })
}




//----------------------------- UPLOADER DRAG & DROP AJAX ------------------------
(()=>{

    let $main = document.querySelector(".dragdrop"),
        $article = document.querySelector(".drop-zone");

    const barrita = (file) =>{
    let $progress = document.createElement("progress");
    let span = document.createElement("span");
    
    $progress.value = 0;
    $progress.max = 100;
    
    $main.insertAdjacentElement("beforeend", $progress);
    $main.insertAdjacentElement("beforeend", span);
    
    
    
    let fileReader = new FileReader();   //Nos permite detectar los bits que van cargados. 
    fileReader.readAsDataURL(file);    //Este fileReader tiene varios eventos.
    
    fileReader.addEventListener("progress", e=>{  //Mientras que se este cargando.
    let progress = parseInt(e.loaded * 100 / e.total);  //Loaded es cuanto va cargando, y total los bits totales. Con el parseInt evitamos los decimales. Esto es para que la barrita se vaya llenando.
    $progress.value = progress;
    span.innerHTML = `${file.name} - ${progress}%`
    })
    
    
    fileReader.addEventListener("loadend", e=>{   //Cuando ya se cargo.
    // upload(file);            //Esto es para que se suba el archivo al PHP y del PHP a la carpeta.
    setTimeout(()=>{
        $main.removeChild($progress);
        $main.removeChild(span);
        $article.classList.remove("is-active");
    }, 3000);
    })
    
    }
    
        
    
    
        $article.addEventListener("dragover", e=>{
           e.preventDefault();
           e.stopPropagation();
           $article.classList.add("is-active");
           $article.querySelector("p").textContent = `DROP TO UPLOAD...`
           
        })
    
        $article.addEventListener("dragleave", e=>{
            e.preventDefault();
            e.stopPropagation();
            $article.classList.remove("is-active");
            $article.querySelector("p").textContent = `DRAG YOUR FILE HERE...`
    
        })
    
        $article.addEventListener("drop", e=>{
            e.preventDefault();
            let files = Array.from(e.dataTransfer.files);
            files.forEach((el)=>{
                barrita(el);
            })
        })
    
})();