let product = []
let cardItem = []

// Display product
const Display = (prd) => {
    if (prd.length > 0) {
        prd.forEach(item => {
            document.getElementById("show-product").innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 border-0 product-card">
                    <img src="${item.image}"
                        class="card-img-top" alt="..." />

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted small">
                            ${item.discription}
                        </p>

                        <h6 class="text-primary mb-2">$${item.price}</h6>

                        <button onclick='addToCart(${item.id})' class="btn btn-primary mt-auto w-100" >
                            <i class="bi bi-cart-plus"></i> Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        document.getElementById("show-product").innerHTML += `
            <h1 class="text-center text-danger-emphasis fw-bold">
                Product is Not Found.
            </h1>
        `;
    }
    Update();
}

// Fetch data
fetch("https://thunhorngork.github.io/Data/")
    .then(res => res.json())
    .then(pcdata => {
        product = pcdata
        console.log(product)
        Display(product)
    })
    .catch(err => console.log(err))

// Search product
document.getElementById("search").addEventListener("input", function (e) {
    let searchValue = e.target.value.toLowerCase()
    console.log(searchValue);

    let found = product.filter(pro => {
        return pro.name.toLowerCase().includes(searchValue)
    })
    document.getElementById("show-product").innerHTML = ``;
    if (found.length > 0) {
        Display(found);
        document.getElementById("txt-search").innerHTML = ``;
    } else {
        document.getElementById("txt-search").innerHTML = `Product is Not Found!`
    }
})

// fc add to cart
const addToCart = (productId) => {
    let prd = product.find(pro => pro.id === productId)
    let itemcart = cardItem.find(i => i.id === productId)
    if (itemcart) {
        itemcart.quantity += 1;
    } else {
        cardItem.push({ ...prd, quantity: 1 })
    }
    Swal.fire({
        title: `${prd.name} added to cart!`,
        text: "Please check your cart",
        icon: "success"
    });
    Update();
}

const Update = () => {
    let cartCount = document.getElementById("cart_count")
    let tocart = document.getElementById("cart-items")

    let total = cardItem.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.innerHTML = total;
}