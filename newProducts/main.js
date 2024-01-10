let perPage = 10;
let page = 1;
let searchVal = "";
function init() {
    fetchData({ search: searchVal });
    fetchCarts();
}
function fetchData({ search }) {
    console.log("1");
    fetch(`${URL}/products?title_like=${search}&_per_page=${perPage}&_page=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const { data: dataRes, pagination } = data;
            products = dataRes;
            renderProducts(products);
            console.log(pagination._totalRows);
            renderPagination(Math.ceil(pagination._totalRows / perPage));
        })
        .catch((error) => {
            console.error("Network error:", error);
        })
        .finally(() => loadingToggle());
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
        })
        .finally(() => loadingToggle());
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
             <a  id="liveToastBtn" onclick="addToCart(event, ${product.id})" class="btn btn-primary">ADD TO CART</a>
         </div>
     </div> `;
        });
        inner($(".list-products"), productsHtml.join(""));
    } else {
        inner($(".list-products"), "<h2>No Product</h2>");
    }
}
function renderPagination(total) {
    inner($(".pagination"), "");
    for (let index = 1; index <= total; index++) {
        $(".pagination").innerHTML += `
        <span onclick="changePagination(${index})" class="${index === page ? "hidden" : ""}">${index}</span>`;
    }
}
function changePagination(pageNumber) {
    page = pageNumber;
    loadingToggle();
    fetchData({ search: searchVal });
}
function search() {
    searchVal = $("input").value;
    loadingToggle();
    fetchData({ search: searchVal });
}
function addToCart(event, id) {
    console.dir(event);
    event.preventDefault();

    const product = find(products, id);
    let cart = {
        ...product,
        productId: product.id,
        quantity: 1,
    };

    const cartFilter = find(carts, id);
    if (cartFilter) {
        let cart = { ...cartFilter, quantity: cartFilter.quantity + 1 };
        // toggleToast();
        $(".toast-body").innerHTML = `You have added <span class="text-success">${cart.title}</span> products to your cart`;
        putCart(cart, id);
    } else {
        postCart(cart);
        // toggleToast();
        $(".toast-body").innerHTML = `You have added <span class="text-success">${cart.title}</span> products to your cart`;
    }
}
function toggleToast() {
    $(".toast").classList.toggle("show", $(".toast").classList.contains("hide") ? "show" : "hide");
    $(".toast-content").classList.add("active");
    setTimeout(() => {
        $(".toast-content").classList.remove("active");
        $(".toast").classList.toggle("show", $(".toast").classList.contains("hide") ? "show" : "hide");
    }, 5000);
}
init();
