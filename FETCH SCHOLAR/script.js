let catfilter = document.querySelector('#categories > select');
let pricefilter = document.querySelector('.sortPrice > select');
let catArr = {data: { all: {}}, details: [0,'all']};





async function myfun() {
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json();
    let arr = [];
  
    // makeobj(data)
    catFun(data);
    drawItems(data);
    // console.log(catArr.data.all)
}


myfun()

function drawCategory(catArr) {
    let count = 0;
    
    let catbox = document.getElementById('cat');

    for(let key in catArr) {
        count++;
        catArr[count] = key;
        catbox.innerHTML += `
        <option value=${count}>${key}</option>
        `;
    }

    catbox.setAttribute('size',count)
    // console.log(count)
}




function catFun(arr) {
  
    catArr.data['all'] = [];
    arr.forEach((ele) => {


        // console.log(catArr.data)

        catArr.data['all'].push(ele);
       


        if(!catArr.data[ele.category]) {
            catArr.data[ele.category] = [ ele ];
            catArr.details.push(ele.category);

        }
        else {
            catArr.data[ele.category].push(ele);
        }
    })

    drawCategory(catArr.data);
}





function drawItems(arr) {
    let main = document.getElementById('main');
    
    let bag = '';

    arr.forEach((ele) => {
       bag += `
       <div class="item">
       <div class="imgbox">
           <img src=${ele.image} alt="">
       </div>
       <div class="itemName">
           <h4>${ele.title}</h4>
       </div>
       <div class="itemprice">
           <h3>Rs. <span>${ele.price} </span></h3>
       </div>
   </div>
       `;
    })

    main.innerHTML = bag;
}


catfilter.addEventListener('click' ,() => {
    // console.log(catfilter)
    // console.log(catfilter.value)
    // console.log(catArr[catfilter.value])
    // console.log(catArr)
    // console.log(catArr['women's clothing'])
    let arr = pricefilterfun(catArr.data[catArr.details[catfilter.value]])
    drawItems(arr)
})




function pricefilterfun(arr2) {

    let arr = [...arr2]
    if(pricefilter.value == 'high') {
        return arr.sort((a, b) => b.price - a.price)
    }
    if(pricefilter.value == 'low') {
        return arr.sort((a, b) => a.price - b.price)
    }
    return arr2;
}

pricefilter.addEventListener('click', () => {
   
    let arr = pricefilterfun(catArr.data[catArr.details[catfilter.value]])
    drawItems(arr)
})

