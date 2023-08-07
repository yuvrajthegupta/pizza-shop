// it is a glue between view and model(mvc)
// i/o operation view layer
// data exchange b/w view and model


//   const rowdiv = document.getElementById("loaddata");
//   let pizzalen = pizza.length;
//   for (let index = 0; index < pizza.length; index++) {
//     const col = document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML = `
//     <div class="card" style="width: 18rem;">
//   <img src="${pizza[index].url}" class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${pizza[index].name}</h5>
//     <p class="card-text">${pizza[index].desc}</p>
//     <a href="#" class="btn btn-primary"> add to cart Rs.${(pizza[index].price)*15}</a>
//   </div>
// </div>
//     `;
//     rowdiv.appendChild(col);
//   }

import productOperations from "../services/product-operations.js";
async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
    }
}
loadPizzas();
function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 15rem;";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id',pizza.id);
    button.addEventListener('click',addToCart);
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary w-100';
    button.style='background-color:green;';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
    return outputDiv;
}
function addToCart(){
    const currentButton=this
    const pizzaId=currentButton.getAttribute('product-id')
    console.log("button pressed",pizzaId);
    productOperations.search(pizzaId)
    printbasket()
}
function printbasket(){
    const cartProducts=productOperations.getProductsInCart()
    const basket=document.getElementById('basket')
    basket.innerText=""
    for(let product of cartProducts){
        const ld=document.createElement('li')
        ld.innerText=`${product.name} ${product.price}`
        basket.appendChild(ld)
    }
    var sum = cartProducts.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.price)
      },0);
    const li=document.createElement('div')
        li.innerText=`Subtotal : Rs.${Math.round(sum)}
                      total tax: Rs.${Math.round(sum*0.18)}
                 Amount Payable: Rs${Math.round(sum*1.18)}`
        basket.appendChild(li)
}   
