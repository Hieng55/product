function init() {
    fetchCarts();
}
function renderCarts(carts) {
    if (carts.length > 0) {
        const cartsHtml = carts.map((cart) => {
            const { image, title, description, category, id, quantity, price } = cart;
            return `  
        <div class="cart-list mb-2 d-flex align-items-center justify-content-between">
        <div class="group d-flex align-items-center gap-3">
        <div class="image">
        <img src="${image}" alt="" />
        </div>
        <div class="info">
            <h3 class="title">${title}</h3>
            <p class="des">${description}</p>
            <p class="type">${category}</p>
        </div>
    </div>
    <div class="input text-center">
        <button onclick="plus(${id})" class="plus" type="button"><i class="fa-solid fa-plus"></i></button>
        <input class="quantity" type="text" value="${quantity}" />
        <button onclick="minus(${id})" class="minus" type="button"><i class="fa-solid fa-minus"></i></button>
    </div>
    <div class="price d-flex justify-content-between">
        <h4 class="money text-center text-success">$<span>${(quantity * price).toFixed(2)}</span></h4>
        <button onclick="remove(${id})" class="remove btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i></button>
    </div>          
        </div>
        `;
        });
        inner($(".renderCart"), cartsHtml.join(""));
    } else {
        alert("o");
    }
}
function fetchCarts() {
    fetch(`${URL}/carts`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            carts = data;
            renderCarts(carts);
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => loadingToggle());
}
function plus(id) {
    const cart = carts.find((cart) => cart.id === id);
    if (cart) {
        cart.quantity++;
        putCart(cart, cart.id);
    }
}
function minus(id) {
    const cart = carts.find((cart) => cart.id === id);
    if (cart) {
        if (cart.quantity > 1) {
            cart.quantity--;
            putCart(cart, cart.id);
        } else {
            deleteCart(cart, cart.id);
        }
    }
}
function remove(id) {
    const cart = carts.find((cart) => cart.id === id);
    deleteCart(cart, cart.id);
}
init();
