    const numjug = document.getElementById('select');
    //console.log(numjug);
    function jugadors(){  
        //console.log(numjug.value);
        var value = numjug.value;
        for(let i = 0; i < value; i++){
            document.getElementById('item-20').innerHTML += `
            <div id="jug">
                <label>${i}</label>
            </div>`;
            //console.dir("item-20");
            numjug.value = "";
        }
    }


    const fitxa = document.getElementById('jug');
    const fitxay = document.getElementById('divy');
    
    function mou(f){
        const fitxa = document.getElementById(f);
        let parentID = fitxa.parentElement.id;
        let str = parentID.split('-');
        let id = parseInt(str[1]);
        let next = document.getElementById(`item-${id-1}`);
        next.append(fitxa);
    }
