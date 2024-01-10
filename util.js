const URL = "http://localhost:4444/api";
let products = [];
let carts = [];
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

var inner = function (selector, value) {
    return (selector.innerHTML = value);
};
function find(data, id) {
    const variable = data.find((value) => {
        return value.id === id;
    });
    return variable;
}
function loadingToggle() {
    console.log("active");
    $(".loading-indicator").classList.toggle("active");
}
function postCart(cart) {
    fetch(`${URL}/carts`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            console.log(carts);
            // fetchCarts();
            // alert("create done");
        })
        .catch((err) => {
            alert(err);
        })
        // .finally(() => loadingToggle());
}
function postCart(cart) {
    fetch(`${URL}/carts`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            console.log(carts);
            // fetchCarts();
            // alert("create done");
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => loadingToggle());
}
function putCart(cart, id) {
    fetch(`${URL}/carts/${id}`, {
        method: "PUT",
        body: JSON.stringify(cart),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            console.log(carts);
            // fetchCarts();
            // alert("create done");
        })
        .catch((err) => {
            alert(err);
        })
        // .finally(() => loadingToggle());
}
function deleteCart(cart, id) {
    fetch(`${URL}/carts/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            console.log(carts);
            // fetchCarts();
            // alert("create done");
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => loadingToggle());
}
function renderCartNumber(quantity) {
    $(".quantity span").innerHTML = `${quantity}`;
}
