const numjug = document.getElementById('select');
//console.log(numjug);
// var myarray = [""];

// function add(){
// 	let a = a[0].substring(1);
// 	myarray.unshiftt(a);
// }
function jugadors(){  
	//console.log(numjug.value);
	var value = numjug.value;
	for(let i = 1; i <= value; i++){
		document.getElementById('item-20').innerHTML += `
		<div id="jug">
			<label style="border-radius: 100%; border: 1px solid #BCEFFF; background: #BCEFFF; ">${i}</label>
		</div>`;
		//console.dir("item-20");
		numjug.value = "";
	}
}

const fitxa = document.getElementsByName('numjug');
console.log(fitxa);

function mou(f){
	const fitxa = document.getElementById(f);
	let parentID = fitxa.parentElement.id;
	let str = parentID.split('-');
	let id = parseInt(str[1]);
	let next = document.getElementById(`item-${id-1}`);
	next.append(fitxa);
}
//reset pag
function reset(){
	window.location.reload();
}
//num rand
var numrand = Math.floor(Math.random() * 10);
document.getElementById("rand").innerHTML = 
	`<p> El numero random és ${numrand} </p>`;
//backgraund
function changeThemeColor(bg, text){
	const body = document.getElementById('body');
	body.style.backgroundColor = bg;
	body.style.color = text;
}
function clar(){
    //var blanc = document.getElementById("b1");
    //blanc.style.background = "white";
    var body1 = document.getElementById("body");
    body1.style.color = "black";
    body1.style.backgroundColor = "white";
    window.sessionStorage.setItem('color', 'light');//sola funciona
    let color = window.sessionStorage.getItem('color');
}
function fosc(){
    //var negre = document.getElementById("b2");
	//negre.style.background = "#E0FFFF";
    var body2 = document.getElementById("body");
    body2.style.color = "white";
    body2.style.backgroundColor = "black";
    window.sessionStorage.setItem('color', 'black');
    let color = window.sessionStorage.getItem('color');
}

	//LLISTA
	//- black white
	//- mure cada fitxa
	//- colors fitxa
