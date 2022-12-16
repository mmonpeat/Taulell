const numjug = document.getElementById('select');
var start = false;
var winner = false;
//variables per numrand que no pugi ser 0
let min = 1;
let max = 6;

var turno_fixa_mover = 1;//el jugador que juga
var value;//num jugadors que esculls

function jugadors(){ 
	if(start == false){//controla que ha començat el joc i no puc possar mes jugadors
		value = numjug.value;
		for(let i = 1; i <= value; i++){
            var colorrand = ft_randomHSl2();
			document.getElementById('item-20').innerHTML += `
			<div id="jug-`+ i +`" class="fitxa" style="background-color:${colorrand}">
                ${i}
			</div>`;
			//creas fitxes en item 20
			//Pq la id de cada jugador sigui diferent
			//editat amb css
		}
		numjug.value = "";//fa que no es vegi per escollir jug en l'etiqueta select
		start = true;
	}
}

function mou(){
	//comencem amb winner==false pq no hi ha ningun guanyador i quan un jug guanyi el posem a true pq no executi mes el codi
	if (winner == false)
	{
		//per cada click a mou, surt un num random
		var numrand = Math.floor(Math.random() * (max - min + 1) + min);
		document.getElementById("rand").innerHTML = 
			`<p>Ha tirat el jugador ${turno_fixa_mover}<br>
					El numero random és ${numrand} </p>`;
		
		//fitxa es el num de la fitxa que toca moure
		const fitxa = document.getElementById("jug-" + turno_fixa_mover);
		let parentID = fitxa.parentElement.id;//agafes item-20
		let str = parentID.split('-');
		let id = parseInt(str[1]);//num casella on es troba la fitxa del jugador al qui li correspon el torn actual
		
		//dest-id es on ha d'acabar la fitxa.
		//si es negatiu o = a 0 rebota
		//el - de dest id es per posar les casselles que no has abançat pq no hi ha mes en positiu i tornar enrerre
		//el cas dest 0 es que has arribat al item 1 pero has abançat una casella mes,
		//llavors et trobes a la casella 2
		let dest_id = id - numrand;
		if (dest_id <= 0)
			dest_id = 2 + (-dest_id);
		let next = document.getElementById(`item-${dest_id}`);
		next.append(fitxa);//per moure la fitxa entre caselles. append afegeix darrere de next, fitxa 

		//settime out pq es pugui veure el num de caselles que has abancat abans de que surti l'alert de que hi ha un guanyador
		if (dest_id == 1)
		{
			setTimeout(() => alert(`El guanyador és el jugador ${turno_fixa_mover} !!!!\nFelicitats :)`), 100);
			winner = true;
		}
		else
		{
			turno_fixa_mover++;//iterrem el torn del jugador
			//en cas de que sigui mes gran que el num de jug que hi ha el reiniciem a 1
			if(turno_fixa_mover > value){
				turno_fixa_mover=1;
			}
		}
	}
}
//reset pag i borra sesionstorage
function reset(){
	window.location.reload();
    window.sessionStorage.clear();
}
//nomes borra sesion storage
function borrses(){
	window.sessionStorage.clear();
	window.sessionStorage.removeItem("fitxes");
}

//canviar backgraund a blanc o negre amb bottons de tipo ratio
//guardo directament per el color de fons al sesion storage per aqui
function changeThemeColor(bg, text){
	const body = document.getElementById('body');
	body.style.backgroundColor = bg;
	body.style.color = text;
}
function clar(){
    var body1 = document.getElementById("body");
    body1.style.color = "black";
    body1.style.backgroundColor = "white";
    window.sessionStorage.setItem('color', 'light');
    let color = window.sessionStorage.getItem('color');
}
function fosc(){
    var body2 = document.getElementById("body");
    body2.style.color = "white";
    body2.style.backgroundColor = "black";
    window.sessionStorage.setItem('color', 'black');
    let color = window.sessionStorage.getItem('color');
}

//Aquesta funcio posa colors de forma aleatoria a les fitxes dels jugadors 
function ft_randomHSl2(){
    var numr1 = Math.floor(Math.random() * 360);
    var x = `hsl(${numr1}, 100%, 50%)`;
    return x;
}

//guardar a localStorage
//He utilitzat un addEventListener per cambiar una mica del onclick.
var array = [];//creem un array buida per afegir l'objecte amb el que volem guardar de les fitxes
var sav = document.getElementById("guardat");
sav.addEventListener('click', function save(){
	array.length = 0;//nateja l'array per si ho tornes a guardar no es dupliquin les fitxes
    //tot el que hi ha en l'etiqueta de classe fitxa es guarda en tot 
    var tot = document.querySelectorAll(".fitxa");
	tot.forEach(element => {
        //fem un parent element per poder posar en l'obj la posicio de la casella del jugador
        var pare = element.parentElement;
		var temp = {
            id: element.id,
            pos: pare.id,
            color: element.style.backgroundColor
        } 
        array.push(temp);//afegeixo l'obj temp al final del array i com està buit, es veurà(amb un console log d'array) les keys i values de totes les fitxes
    });
    //console.dir(array);
    sessionStorage.setItem("fitxes", JSON.stringify(array));//JSON.stringify converteix l'array d'obj a str
});

//posar tot el guardat de nou a la pagina
function show(){
    //selecionem totes les casselles i amb innerhtml les deixem buides
    var nat = document.querySelectorAll("li");
	nat.forEach(element => {
        element.innerHTML= "";
        //console.dir(element);
    });
	//agafem l'array guardat en sesionstorage que l'he anomenat fitxes
    var info = window.sessionStorage.getItem("fitxes");
    var infofitxes = JSON.parse(info);//JSON.parse converteix str a arrays
    infofitxes.forEach(fitxa => {
        var posicio = document.getElementById(fitxa.pos);
		let str = fitxa.id.split('-');//separem jug-x amb - i agafem la x
		let num = parseInt(str[1]); //convertim array en string
        posicio.innerHTML += `
			<div id="`+ fitxa.id +`" class="fitxa" style="background-color:${fitxa.color}">
                ${num}
			</div>`;
    });
}

