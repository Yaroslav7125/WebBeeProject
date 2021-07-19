let url1 = "https://yaroslav7125.github.io/SPA.io/ajax/first.html";
let url2 = "http://localhost:3000/templates/main-screen.html";
let url3 = "http://localhost:3000/templates/main-screen-map.html";
let elem = document.getElementById('content');


console.log(elem);



let xhttp = new XMLHttpRequest(); 


xhttp.onreadystatechange = function(){
    if(this.readyState==4&&this.status == 200){  // если ответ от сервера есть и он хороший - 20
        myFunction(this.responseText); // тогда вызываем функцию myFunction
    }
}

/* console.log("make xhttp");
xhttp.open("Get", "https://yaroslav7125.github.io/SPA.io/ajax/first.html");
xhttp.send(); */

let number = 1;

let myFunction = data => {
    console.log(data+ `${number++}`);                   /*отладка*/ 
    let elm = document.getElementById("content");
    console.log(elm);
    elm.innerHTML = data;



}
let makeGetRequest = uri =>{
    xhttp.open("Get", uri);
    xhttp.send();
}



let callFucnk = ()=>{
    makeGetRequest(`${url2}`);
} 



//-------------------------------------------------------------------------


divElem = document.querySelector(".nav");
console.log(divElem);       /*отладка*/




function Router(ThePath){
    switch(ThePath){
        case '/':
            return "TheMain";
            break;
        case '/map':
            return TheMap;
            break;
        case '/activyty':
            return "TheActivity"
            break;
    };  
}

divElem.