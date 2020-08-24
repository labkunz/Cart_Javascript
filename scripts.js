if(document.readyState == 'loading') { 
    document.addEventListener('DOMContectLoaded', ready) 
} else {
    ready()
}

function ready() {
    var addItemToCartButtons = document.getElementsByClassName('add-to-cart')
    Array.prototype.forEach.call(addItemToCartButtons, item =>
         item.addEventListener('click', addToCartClicked))

    var removeCartItemButtons = document.getElementsByClassName('remove')
    Array.prototype.forEach.call(removeCartItemButtons, item =>
        item.addEventListener('click', removeCartItem))

    var increaseQuantityButtons = document.getElementsByClassName('increase')
    Array.prototype.forEach.call(increaseQuantityButtons, item =>
        item.addEventListener('click', increaseQuantity))

    var decreaseQuantityButtons = document.getElementsByClassName('decrease')
    Array.prototype.forEach.call(decreaseQuantityButtons, item =>
        item.addEventListener('click', decreaseQuantity))

    var purchaseCartItemButton = document.getElementsByClassName('purchase')
    purchaseCartItemButton[0].addEventListener('click', purchaseCartItem)
}

function addToCartClicked(event) {
    var storeItem = event.target.parentNode.parentNode

    var storeItemTitle = storeItem.getElementsByClassName('store-goods')[0].innerText
    var storeItemPrice = storeItem.getElementsByClassName('store-price')[0].innerText.replace('$','')
    var storeItemImage = storeItem.getElementsByClassName('store-img')[0].src
    var storeItemIndex = storeItem.getAttribute('data-item')

    var allCartItem = document.getElementsByClassName('cart-all-item')[0].children
    var isNewItem = true;
    for(var i=0; i<allCartItem.length; i++) {
        if(allCartItem[i].getAttribute('data-item') == storeItemIndex) {
            isNewItem = false;
            break
        }
    }

    if(isNewItem) {
        addItemToCart(storeItemImage, storeItemTitle, storeItemPrice, storeItemIndex)
    } else {
        alert("This good is alreay be add in cart!!!")
    }

    totalCartItemPrice()
}

function addItemToCart(image, title, price, index) {
    var cartItem = `<div class="goods cart-column">  
                        <img class="goods-img" src="${image}" width="100" height="100">
                        <span class="goods-title"> ${title} </span>
                    </div>
                    <div class="quantity cart-column">
                        <button class="increase"> + </button>
                        <input class="quantity-input" type="number" value="1" min="1">
                        <button class="decrease"> - </button>
                    </div>
                    <div class="price cart-column">
                        <span class="price-title"> $${price} </span>
                        <button class="remove"> Remove </button>
                    </div>`

    var newItem = document.createElement('div')
    newItem.classList.add('cart-item') 
    newItem.dataset.item = index
    newItem.innerHTML = cartItem

    var addpoint = document.getElementsByClassName('cart-all-item')[0] 
    addpoint.append(newItem) 

    newItem.getElementsByClassName('increase')[0].addEventListener('click', increaseQuantity)
    newItem.getElementsByClassName('decrease')[0].addEventListener('click', decreaseQuantity)
    newItem.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
}

function removeCartItem(event) {
    var cartItem = event.target.parentNode.parentNode
    cartItem.remove()
    totalCartItemPrice()
}

function increaseQuantity(event) {
    var quantityField = event.target.parentNode
    var quantityInput = quantityField.getElementsByClassName('quantity-input')[0]
    var quantity = quantityInput.value

    quantityInput.value = parseInt(quantity) + 1
    singleCartItemPrice(quantityField, quantityInput.value)
    totalCartItemPrice()
}

function decreaseQuantity(event) {
    var quantityField = event.target.parentNode
    var quantityInput = quantityField.getElementsByClassName('quantity-input')[0]
    var quantity = quantityInput.value

    if(quantity > 1) {
        quantityInput.value = parseInt(quantity) - 1 
    }
    singleCartItemPrice(quantityField, quantityInput.value)
    totalCartItemPrice()
}

function singleCartItemPrice(itemTarget, quantity) {
    var item = itemTarget.parentNode
    var itemIndex = item.getAttribute('data-item')
    
    var allStoreItem = document.getElementsByClassName('store-block')[0].children
    var singlePrice = "";
    for(var i=0; i<allStoreItem.length; i++) {
        if(allStoreItem[i].getAttribute('data-item') == itemIndex) {
            var singlePriceText = allStoreItem[i].getElementsByClassName('store-price')[0].innerText
            singlePrice = singlePriceText.trim().replace('$', '')
            break
        }
    }
    
    var ItemPrice = parseInt(singlePrice) * quantity
    var currentlyPriceField = item.getElementsByClassName('price-title')[0]
    currentlyPriceField.textContent = " $" + ItemPrice + " "
}

function totalCartItemPrice() {
    var itemPriceTotal = 0
    var allCartItem = document.getElementsByClassName('cart-all-item')[0].children
    for(var i=0; i<allCartItem.length; i++) {
        var itemPrice = allCartItem[i].getElementsByClassName('price-title')[0].innerText
        itemPrice = itemPrice.trim().replace('$', '')
        itemPriceTotal += parseInt(itemPrice)
    }

    var totalPriceField = document.getElementsByClassName('totalPrice')[0]
    totalPriceField.innerText = " $" + itemPriceTotal + " "
}

function purchaseCartItem() {
    var allCartItemField = document.getElementsByClassName('cart-all-item')[0]

    while(allCartItemField.firstChild) {
        allCartItemField.removeChild(allCartItemField.lastChild)
    }

    var totalPriceField = document.getElementsByClassName('totalPrice')[0]
    totalPriceField.innerText = " $0 "
}