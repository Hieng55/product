let page = 1;
let limit = 10;
let valSearch = "";

function init() {
    fetchData({ search: valSearch });
    fetchCarts();
}
function renderProducts(products) {
    if (products.length > 0) {
        let productsHtml = products.map((product) => {
            return `<div class="card" style="width: 320px">
    <div class="image">
    <img class="card-img-top" src="${product.image}" alt="Card image" style="width: 100%" />
    <span class="card-discount">${product.discount}</span>
    </div>
     <div class="card-body">
         <h4 class="card-title">${product.title}</h4>
         <p class="card-price">$${product.price.toFixed(2)}</p>
         <p class="card-text">${product.description}</p>
         <button onclick="addToCart(${product.id})" class="btn btn-primary">ADD TO CART</button>
     </div>
 </div> `;
        });
        inner($(".list-products"), productsHtml.join(""));
    } else {
        inner($(".list-products"), "<h2>No Product</h2>");
    }
}
function fetchData({ search }) {
    fetch(`${URL}/products?title_like=${search}&per_page=${limit}&_page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const { data: productsRes, pagination } = data;
            products = productsRes;
            renderProducts(productsRes);
            renderPagination(Math.ceil(pagination._totalRows / limit));
        })
        .catch((error) => {
            throw new Error(`Error status: ${error.status}`);
        })
        .finally(() => loadingToggle());
}

function addToCart(id) {
    const product = products.find((product) => product.id === id);
    let cart = {
        ...product,
        quantity: 1,
        productId: product.id,
    };
    const cartsFilter = carts.find((cart) => cart.id === id);
    if (cartsFilter) {
        cart = {
            ...cartsFilter,
            quantity: cartsFilter.quantity + 1,
        };
        putCart(cart, cart.id);
    } else {
        postCart(cart);
    }
}

function renderPagination(total) {
    inner($(".pagination"), "");
    for (let index = 1; index <= total; index++) {
        $(".pagination").innerHTML += `
        <span onclick="changePagination(${index})" class="${index === page ? "hidden" : ""}">${index}</span>`;
    }
}
function changePagination(number) {
    page = number;
    loadingToggle();
    fetchData({ search: valSearch });
}
function search() {
    page = 1;
    valSearch = $("input").value;
    loadingToggle();
    fetchData({ search: valSearch });
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
            console.log(data);
            carts = data;
            renderCartNumber(carts.length);
        })
        .catch((error) => {
            alert(error);
        });
}

init();
