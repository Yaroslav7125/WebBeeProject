const divElem = document.querySelector(".nav"); // navbar в котором находятся ссылки content = document.getElementById('content') // div элемент куда вставляется контент
const ShowContent = data => {
    content.innerHTML = data;
    showTime();
}
let makeGetRequest = (uri, cb) =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("Get", uri);
    xhttp.send();
    xhttp.onreadystatechange = function(ev){
        if(this.readyState==4&&this.status == 200){  // если ответ от сервера есть и он хороший - 20
            cb && cb(this.responseText);
        }
    }
}
let flag = false;
function GetContent(ThePath){
    switch(ThePath){
         case '/':
            makeGetRequest(`${location.origin}/templates${ThePath}activity.html`, (data) => ShowContent(data));
            break; 
        case '/map.html':
            makeGetRequest(`${location.origin}/templates${ThePath}`, (data) => {
                ShowContent(data); // тогда вызываем функцию myFunction
                DG.then(function() {
                    map = DG.map('map', {
                        'center': [54.98, 82.89],
                        'zoom': 17
                    });
                    navigator.geolocation.getCurrentPosition((pos)=>{
                        coord = pos.coords;
                        DG.marker([coord.latitude, coord.longitude]).addTo(map);
                        map.setView([coord.latitude,coord.longitude],17);
                    });
                    
                });
            });
            break;
        case '/activity.html':
            //history.pushState(null, null, ThePath)
            makeGetRequest(`${location.origin}/templates${ThePath}`, (data) => ShowContent(data));
            break;
        case '/time.html':
            makeGetRequest(`${location.origin}/templates${ThePath}`, (data) => ShowContent(data));
            break;    
    };  
    
}
GetContent(location.pathname);

let links = document.querySelectorAll(".actions-href");
links.forEach((elm)=> {
    elm.addEventListener('click', function(e){
        e.preventDefault(); 
        let path = elm.getAttribute("href");
        links.forEach((link)=>{
            link.classList.remove('active');
        });
        elm.classList.add('active');
        history.pushState(null, null, path);
        GetContent(path);  
    })
});
window.addEventListener('popstate',function(){
    GetContent(location.pathname); 
});
//timer
let sec = 0;
showTime = function(){
    let timer = document.getElementById('timer');
    if (timer == null)return;
    let secStr = String(sec%60).padStart(2, '0');
    let hoursStr = String(Math.trunc(sec/3600)).padStart(2, '0');
    let minutesStr = String(Math.trunc(sec/60)).padStart(2, '0');
    timer.innerHTML =  `${hoursStr}:${minutesStr}:${secStr}`;   
}
function Timer(){
    let timerId = setInterval(()=> /* showTime() */countTime(), 1000);
}
function countTime(){
    sec++;
    showTime();
}
document.addEventListener("DOMContentLoaded", Timer);
showTime(); // при переходе должен быть запущен таймер