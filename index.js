let url1 = "https://yaroslav7125.github.io/SPA.io/ajax/first.html";
let url2 = "http://localhost:3000/templates/main-screen.html";
let url3 = "http://localhost:3000/templates/main-screen-map.html";
let elem = document.getElementById('content');
let MainAjaxContainer= document.getElementById('content');



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



/*------------------------------------------------------------*/ 






//let apiKey2 = 'AIzaSyCrrM6t1dS36jnMhuDCOtu7_hq328mz188';


var links, updatestate, updatebuttons, contentEl, navEl;

contentEl = document.querySelector('.content');
navEl = document.querySelector(".a");
console.log(contentEl);


links = {
    activity:'This is the <strong>about</strong> page',
    map:"This is the <strong>about</strong> page",
    time:"This is the <strong>downloads</strong> page",
};

updatestate = function(state){
    if(!state) return;
    contentEl.innerHTML = links[state.page];
}

// window.addEventListener("hashchange", updatestate);
// window.addEventListener('load', updatestate);
window.addEventListener('popstate', function(e){
    updatestate(e.state);
});

/* updatebuttons = function(state){
    [].slice.call(navEl.querySelectorAll('a'))
        .forEach(function(e){
            var classList = e.parentNode.classList;
            state.page ===e.getAttribute('href')
                ?classList.add('active')
                :classList.remove('active');

        });

}; */

navEl.addEventListener('click', function(e){
    var state;
    if(e.target.tagName !=="A")return;
    state = {
        page:e.target.getAttribute('href')
    };
    history.pushState(state,'', state.page); // state описывает состояние, далее описание, относительная ссылка
    updatestate(state);
    console.log(state.page);
    e.target.getAttribute('href');
    e.preventDefault();
});



