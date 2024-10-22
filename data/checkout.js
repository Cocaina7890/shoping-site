import { products } from "./products.js";

import {cart,removeFromCart} from "../data/cart.js";
// import { addCartQuantity } from "./script/amazon.js";
import dayjs from '//unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from "./script/cartDelivery.js";

 const days = dayjs()
    const numDays = days.add(7, 'days');
    const format = numDays.format('dddd,MMMM,D')
    console.log(format)

let CartSummary = '';
cart.forEach (cartItem => {
  const productId = cartItem.productId;


let matchingProduct;
products.forEach ((item) => {
  if(productId === item.id){
    matchingProduct = item
  }
})

 const deliveryId = cartItem.deliveryOptionId;
    
  let deliveryOptions = ''

   deliveryOption.forEach((option) =>{
    if(option.id === deliveryId){
      deliveryOptions = option
    }
   })
   const days = dayjs()
    const numDays = days.add(deliveryOptions.deliveryDay, 'days');
    const format = numDays.format('dddd,MMMM,D')


       CartSummary +=     `<div class="cart-item-container remove-from-cart-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date:${format}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">2</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary deleteItem"data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
          </div>
`

})
   
function deliveryOptionHTML(matchingProduct, cartItem){

   let html = '';

  deliveryOption.forEach((deliveryOptions) =>{
    const days = dayjs()
    const numDays = days.add(deliveryOptions.deliveryDay, 'days');
    const format = numDays.format('dddd,MMMM,D')
    
    const priceString = deliveryOptions.priceCents 
    === 0
    ? 'FREE'
    : `$${(deliveryOptions.priceCents / 100).toFixed(2)} - `
    const isChecked = deliveryOptions.id === cartItem.deliveryOptionId

   html += ` <div class="delivery-option">
                  <input type="radio"
                  ${isChecked ? `checked` : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${format}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}Shipping
                    </div>
                  </div>
                </div>`
  })
  return html
}
 

document.querySelector('.summaryHTML').innerHTML = CartSummary;

  
const deal  =   document.querySelectorAll('.deleteItem')

deal.forEach((link) =>{
  link.addEventListener('click', () => {
    const productId =  link.dataset.productId
    removeFromCart(productId)
    console.log(cart)
    const removeCart =  document.querySelector(`.remove-from-cart-${productId}`)

    removeCart.remove()
    updateCartQuantity()
 
  });
  
});


// document.querySelector('.innerCalc').innerHTML = `${cartQuantity}`

     
      
      function updateCartQuantity() {
        let cartQuantity = 0;
      
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
        
      
        document.querySelector('.innercalc')
          .innerHTML = `${cartQuantity} items`;
      }
      
      
      updateCartQuantity();

