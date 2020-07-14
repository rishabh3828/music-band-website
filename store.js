if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready () {
var removeButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeButtons.length; i++){
    var removeButton = removeButtons[i];
    removeButton.addEventListener('click', removeButtonFromCart);
}
var quantity = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantity.length; i++){
    var quantityInput = quantity[i];
    quantityInput.addEventListener('change', quantityChanged);
}

var addToCartElement = document.getElementsByClassName('shop-item-btn');
for (var i = 0; i < addToCartElement.length; i++){
    var addToCartButton = addToCartElement[i];
    addToCartButton.addEventListener('click', addToCart);
}

var purchaseButton = document.getElementsByClassName('purchase-btn-final')[0];
purchaseButton.addEventListener('click', purchaseButtonClicked);

}

function purchaseButtonClicked (event){
    var button = event.target;
    alert('Thank you for your purchase');
    var itemList = document.getElementsByClassName('cart-row-items')[0];
    while(itemList.hasChildNodes()){
        itemList.removeChild(itemList.firstChild);
    }
    updateCartTotal();
}

function addToCart (event) {
    var addToCartButton = event.target;
    var button = addToCartButton.parentElement.parentElement;
    var title = button.getElementsByClassName('shop-item-name')[0].innerText;
    var imageSrc = button.getElementsByClassName('shop-item-image')[0].src;
    var price = button.getElementsByClassName('shop-item-price')[0].innerText;
    addToCartClicked(title, imageSrc, price);
    updateCartTotal();
}

function addToCartClicked (title, imageSrc, price) {
    var cartRowItems = document.getElementsByClassName('cart-row-items')[0];
    var titleNames = cartRowItems.getElementsByClassName('cart-item-name');
    for (var i = 0; i < titleNames.length; i++){
        if (titleNames[i].innerText == title){
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRow = document.createElement('div');
    var item = `<div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}">
                    <span class="cart-item-name">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger btn-input" type="button">REMOVE</button>
                </div>
                </div>`;
    cartRow.innerHTML = item;
    cartRowItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeButtonFromCart);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);           
}


function quantityChanged (event) {
        var quantity = event.target;
        if (isNaN(quantity.value) || quantity.value <=0 ){
            quantity.value = 1;
        }
        updateCartTotal();
}

function removeButtonFromCart (event) {
        var button = event.target;
        button.parentElement.parentElement.remove();
        updateCartTotal();
}

function updateCartTotal () {
    var amount = 0;
    var cartItemContainer = document.getElementsByClassName('cart-row-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    console.log(cartRows);
     for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        amount = amount + price*quantity;
        }
        amount = Math.round(amount*100) / 100;
        console.log(amount);
        document.getElementsByClassName('cart-total-amount')[0].innerText = '$' + amount;
}




