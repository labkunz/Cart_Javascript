//console.log("in here") //直接output來確認有抓到對應的html檔

var addItemToCartButtons = document.getElementsByClassName('add-to-cart')
//console.log(addItemToCartButtons) //確認有抓到相對應class的html標籤
var removeCartItemButtons = document.getElementsByClassName('remove')
var increaseQuantityButtons = document.getElementsByClassName('increase')
var decreaseQuantityButtons = document.getElementsByClassName('decrease')
var purchaseCartItemButton = document.getElementsByClassName('purchase')

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

//addItemToCartButtons.forEach(element => element.addEventListener('click', addItemToCart));
//上述此方法無法使用
Array.prototype.forEach.call(addItemToCartButtons, item => item.addEventListener('click', addItemToCart))

/*
for(var i=0; i<removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}
*/
//[removeCartItemButtons].forEach(item => item.addEventListener('click', removeCartItem))
//上述此方法無法使用 WHY?

for(var item of removeCartItemButtons){
    item.addEventListener('click', removeCartItem)
}

for(var i=0; i<increaseQuantityButtons.length; i++){
    var button = increaseQuantityButtons[i]
    button.addEventListener('click', increaseQuantity)
}

for(var i=0; i<decreaseQuantityButtons.length; i++){
    var button = decreaseQuantityButtons[i]
    button.addEventListener('click', decreaseQuantity)
}

purchaseCartItemButton[0].addEventListener('click', purchaseCartItem)

function addItemToCart() {
    console.log("Add to Cart button be clicked in function")
}

function removeCartItem() {
    console.log("Remove button be clicked in function")
}

function increaseQuantity() {
    console.log("Increase button be clicked in function")
}

function decreaseQuantity() {
    console.log("Decrease button be clicked in function")
}

function purchaseCartItem() {
    console.log("Purchase button be clicked in function")
}