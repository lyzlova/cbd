const itemBox = document.querySelectorAll(".products__item");
const cartCont = document.getElementById("cart");
const cart = document.querySelector(".cart");
const amount = document.querySelector(".info-header__amount");
let cartData = getCartData() || {};
amount.textContent = Object.keys(cartData).length;

cartCont.addEventListener("click", openCart);
cart.addEventListener("click", deleteCart);

function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}

function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
  return false;
}

function addToCart(e) {
  this.disabled = true;
  const parentBox = this.parentNode.parentNode;
  const itemId = this.getAttribute("data-id");
  const itemTitle = parentBox.querySelector(".card__title").innerHTML;
  const itemPrice = parentBox.querySelector(".card__price").innerHTML;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][2] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  if (!setCartData(cartData)) {
    this.disabled = false;
  }
  amount.textContent = Object.keys(cartData).length;
  return false;
}

itemBox.forEach((item) => {
  const btn = item.querySelector(".card__add");
  btn.addEventListener("click", addToCart);
});

function parseNumber(n) {
  return Number(n.replace(/[^0-9\.-]+/g, ""));
}

function openCart(e) {
  e.preventDefault();
  cart.classList.toggle("is-open");
  let totalItems = "";
  let totalCount = 0;
  let totalSum = 0;
  const cartData = getCartData();
  if (cartData !== null) {
    totalItems =
      '<table class="shopping__list"><tr><th>Name</th><th>Price</th><th>Amount</th><th></th></tr>';
    for (let items in cartData) {
      totalItems += "<tr>";
      for (var i = 0; i < cartData[items].length; i++) {
        totalItems += "<td>" + cartData[items][i] + "</td>";
      }
      totalSum += parseNumber(cartData[items][1]) * cartData[items][2];
      totalCount += cartData[items][2];
      totalItems +=
        '<td><span class="del__item" data-id="' + items + '">X</span></td>';
      totalItems += "</tr>";
    }
    totalItems +=
      '<tr><td><strong>Amount</strong></td><td><span id="total__sum">' +
      totalSum +
      '</span>$</td><td><span id="total__count">' +
      totalCount +
      "</span></td><td></td></tr>";
    totalItems += "<table>";
    cart.innerHTML = totalItems;
    amount.textContent = Object.keys(cartData).length;
  }
  return false;
}

function closest(el, sel) {
  if (el !== null)
    return el.matches(sel)
      ? el
      : el.querySelector(sel) || closest(el.parentNode, sel);
}

function deleteCart(e) {
  if (e.target.className === "del__item") {
    let itemId = e.target.getAttribute("data-id"),
      cartData = getCartData();
    if (cartData.hasOwnProperty(itemId)) {
      let tr = closest(e.target.parentNode, "tr");
      tr.parentNode.removeChild(tr);
      let totalSumOutput = document.getElementById("total__sum");
      let totalCountOutput = document.getElementById("total__count");
      totalSumOutput.textContent =
        +totalSumOutput.textContent -
        parseNumber(cartData[itemId][1]) * cartData[itemId][2];
      totalCountOutput.textContent =
        +totalCountOutput.textContent - cartData[itemId][2];
      delete cartData[itemId];
      setCartData(cartData);
      amount.innerHTML = Object.keys(cartData).length;
    }
  }
}
