function getPath(str){
    return str.split('/')[str.split('/').length-1];
}
divElem = document.querySelector(".nav"); // navbar в котором находятся ссылки
content = document.getElementById('content') // div элемент куда вставляется контент

const ShowContent = data => {
    content.innerHTML = data;
    if(document.getElementById('timer') != null){
        document.getElementById('timer').innerHTML =  `${hours}:${minutes}:${sec}`;
    }
}
let makeGetRequest = (uri, cb) =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("Get", uri);
    xhttp.send();

    
    xhttp.onreadystatechange = function(ev){
        if(this.readyState==4&&this.status == 200){  // если ответ от сервера есть и он хороший - 20
            cb && cb(this.responseText);
            // ShowContent(this.responseText); // тогда вызываем функцию myFunction
        }
    }

}

//-------------------------------------------------------------------------

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
divElem.addEventListener('click', function(e){
    if(e.target.tagName!=="A")return;
    let path = e.target.getAttribute("href");
    
    history.pushState(null, null, path);
    GetContent(path);  
    e.preventDefault();  
});
window.addEventListener('popstate',function(){
    GetContent(location.pathname); 
    
});
///////////////////////////////////timer
let sec = 0;
let hours = 0;
let minutes = 0;
document.addEventListener("DOMContentLoaded", ()=>{
    if(document.getElementById('timer') != null){
        document.getElementById('timer').innerHTML =  `${hours}:${minutes}:${sec}`;
    }
});
showTime = function(){
    if(sec==60){sec=0; minutes +=1;}
    if(minutes==60){minute=0;hours+=1};
    sec+=1;
    if (document.getElementById('timer') == null)return;
    document.getElementById('timer').innerHTML =  `${hours}:${minutes}:${sec}`;   
}
function Timer(){
    let timerId = setInterval(()=> showTime(), 1000);
}
document.addEventListener("DOMContentLoaded", Timer);
showTime(); // при переходе должен быть запущен таймер





console
