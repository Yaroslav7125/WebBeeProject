let url1 = "https://yaroslav7125.github.io/SPA.io/ajax/first.html";
let url2 = "http://localhost:3000/templates/main-screen.html";
let url3 = "http://localhost:3000/templates/main-screen-map.html";











/* console.log("make xhttp");
xhttp.open("Get", "https://yaroslav7125.github.io/SPA.io/ajax/first.html");
xhttp.send(); */





function getPath(str){
    return str.split('/')[str.split('/').length-1];
}

///----------------------------------------------------------------------
divElem = document.querySelector(".nav"); // navbar в котором находятся ссылки
content = document.getElementById('content') // div элемент куда вставляется контент
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    console.log(`Status is ${this.status}`);
    if(this.readyState==4&&this.status == 200){  // если ответ от сервера есть и он хороший - 20
        ShowContent(this.responseText); // тогда вызываем функцию myFunction
    }
}
const ShowContent = data => {
    console.log(data);
    content.innerHTML = data;
}
let makeGetRequest = uri =>{
    xhttp.open("Get", uri);
    xhttp.send();
}

//-------------------------------------------------------------------------

let flag = false;
function GetContent(ThePath){
    switch(ThePath){

         case '/':
            makeGetRequest(`${location.origin}/templates${ThePath}activity.html`);
            break; 
        case '/map.html':
            //history.pushState(null, null, ThePath)
            makeGetRequest(`${location.origin}/templates${ThePath}`);
            break;

        case '/activity.html':
            //history.pushState(null, null, ThePath)
            makeGetRequest(`${location.origin}/templates${ThePath}`);
            break;
        case '/time.html':
            makeGetRequest(`${location.origin}/templates${ThePath}`);
            break;    
    };  
    

    //console.log(ThePath);                     //отлавдка
}

console.log(location.pathname)
GetContent(location.pathname);
divElem.addEventListener('click', function(e){
    if(e.target.tagName!=="A")return;
    let path = e.target.getAttribute("href");
    
    history.pushState(null, null, path);
    GetContent(path);  
    e.preventDefault();  
});
window.addEventListener('popstate',function(){
    //console.log(location.pathname);
    GetContent(location.pathname); 
    
});





