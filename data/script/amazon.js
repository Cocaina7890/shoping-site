import { cart, addToCart } from "../cart.js"
import {products} from "../products.js"

  
  let  productHTML = '';

products.forEach( props => {
    productHTML +=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${props.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${props.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${props.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${props.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${ props.priceCents /100}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart-button" data-product-id=${props.id}>
            Add to Cart
          </button>
          <p class="added"></p>
        </div>
`
})

document.querySelector('.products-grid').innerHTML = productHTML


document.querySelectorAll('.js-cart-button').
forEach((button) => {
    button.addEventListener('click', () => {
        

     
        const productId =   button.dataset.productId;
        addToCart(productId)
        addCartQuantity()

    })
        
        

    })
   
  export   function addCartQuantity(){
    let cartQuantity = 0 ;

        cart.forEach((item) =>{
            cartQuantity += item.quantity;
        })
          
      document.querySelector('.cart-quantity').innerHTML = cartQuantity
      
       
        

    }



function added(){
    const add = document.querySelector('.added')

      if (add.innerHTML === ''){
        add.innerHTML = 'added'
      }
}
