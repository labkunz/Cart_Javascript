//console.log("in here") //直接output來確認有抓到對應的html檔

if(document.readyState == 'loading') { //網頁載入的狀態:讀取中(loading)
    document.addEventListener('DOMContectLoaded', ready) 
    //網頁生命週期中的DOMContectLoaded(已加載完HTML,DOM建構完成時)
} else {
    ready()
}

function ready() {
    var addItemToCartButtons = document.getElementsByClassName('add-to-cart')
    //console.log(addItemToCartButtons) //確認有抓到相對應class的html標籤
    Array.prototype.forEach.call(addItemToCartButtons, item => item.addEventListener('click', addToCartClicked))
    //上述是第一種forEach寫法

    var removeCartItemButtons = document.getElementsByClassName('remove')
    for(var item of removeCartItemButtons){
        item.addEventListener('click', removeCartItem)
    }
    //上述是第二種寫法,應該算for?

    var increaseQuantityButtons = document.getElementsByClassName('increase')
    for(var i=0; i<increaseQuantityButtons.length; i++){
        var button = increaseQuantityButtons[i]
        button.addEventListener('click', increaseQuantity)
    }
    //第三種,最常見的方式

    var decreaseQuantityButtons = document.getElementsByClassName('decrease')
    for(var i=0; i<decreaseQuantityButtons.length; i++){
        var button = decreaseQuantityButtons[i]
        button.addEventListener('click', decreaseQuantity)
    }
    /*
    for(var i=0; i<addItemToCartButtons.length; i++){
        var button = addItemToCartButtons[i]
        button.addEventListener('click', function() {
            console.log("clicked")
        })
        //button.addEventListener('click', addItemToCart()) //不能加上小括號,否則會在頁面載入時就觸發 WHY?
    }
    */
    //上述是全寫在一function裡的方式

    //[removeCartItemButtons].forEach(item => item.addEventListener('click', removeCartItem))
    //上述此方法無法使用 WHY?

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
        //利用HTML5新增的data-*屬性來確認購物車內是否已有此項目
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
                    </div>` //不用整個包進來,因為要新增元素加入的關係不用留著最外面的一層

    var newItem = document.createElement('div')
    newItem.classList.add('cart-item') //對新增的元素加上屬性
    newItem.dataset.item = index
    newItem.innerHTML = cartItem //未使用innerHTML直接加上去會以純文本顯示

    var addpoint = document.getElementsByClassName('cart-all-item')[0] 
    addpoint.append(newItem) //從指定屬性的元素內,以最尾端放入

    newItem.getElementsByClassName('increase')[0].addEventListener('click', increaseQuantity)
    newItem.getElementsByClassName('decrease')[0].addEventListener('click', decreaseQuantity)
    newItem.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    //加上原本需要的事件
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
        quantityInput.value = parseInt(quantity) - 1 //讓數量不要成為負數
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
    /*
    var allCartItem = document.getElementsByClassName('cart-all-item')[0].children
    var allCartItemNumber = allCartItem.length
    for(var i=0; i<allCartItemNumber; i++) {
        allCartItem[i].remove()
    } 
    */
    //上述為原本的寫法,執行起來會有不完全刪完的狀況

    var allCartItemField = document.getElementsByClassName('cart-all-item')[0]
    //allCartItemField.innerHTML = '' //第一種方法

    while(allCartItemField.firstChild) {
        allCartItemField.removeChild(allCartItemField.lastChild)
    } //第二種方法

    var totalPriceField = document.getElementsByClassName('totalPrice')[0]
    totalPriceField.innerText = " $0 "
}