const numjug = document.getElementById('select');
var start = false;
var winner = false;
//variables per numrand que no pugi ser 0
let min = 1;
let max = 6;

var turno_fixa_mover = 1;//el jugador que juga
var value;//num jugadors que esculls

//LLISTA
//- colors fitxa random
//- agafi numrand i es mogi numrand
//- num rand 1-6

function jugadors(){ 
	if(start == false){//controla que ha començat el joc i no puc possar mes jugadors
		value = numjug.value;
		for(let i = 1; i <= value; i++){
			document.getElementById('item-20').innerHTML += `
			<div id="jug`+ i +`">
				<label class="fitxa">${i}</label>
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
			`<p> El numero random és ${numrand} </p>`;
		
		//fitxa es el num de la fitxa que toca moure
		const fitxa = document.getElementById("jug" + turno_fixa_mover);
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
		next.append(fitxa);//per moure la fitxa entre caselles

		//settime out pq es pugui veure el num de caselles que has abancat abans de que surti l'alert de que hi ha un guanyador
		if (dest_id == 1)
		{
			setTimeout(() => alert(`El ganador és el jugador ${turno_fixa_mover}`), 100);
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
//reset pag
function reset(){
	window.location.reload();
}

//canviar backgraund
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
