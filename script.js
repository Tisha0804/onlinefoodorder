
let cart = [];
window.onload = function () {
window.onload = () => updateCart();
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    updateCart();
};

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    showToast(name + " Added To Cart");
}
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
    const cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>
                <h3>${item.name}</h3>
                <h4>₹${item.price} × ${item.quantity}</h4>
            </div>

            <div>

                <button class="plus"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button class="minus"
                    onclick="decreaseQuantity(${index})">
                    -
                </button>

                <button class="remove"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;
    });

    totalPrice.innerText = total;
    cartCount.innerText = count;
}
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
    updateCart();
}
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showToast("Item Removed");
}
const openCartBtn = document.getElementById("openCartBtn");
const cartModal = document.getElementById("cartModal");

openCartBtn.addEventListener("click", function () {

    cartModal.classList.add("active");
});
const closeCartBtn = document.getElementById("closeCartBtn");

closeCartBtn.addEventListener("click", function () {

    cartModal.classList.remove("active");
});
const searchFood = document.getElementById("searchFood");

searchFood.addEventListener("keyup", function () {

    const value = searchFood.value.toLowerCase();

    const cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {

        const foodName =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

        if (foodName.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
});



const foodFilter = document.getElementById("foodFilter");

foodFilter.addEventListener("change", function () {

    const category = foodFilter.value;

    const cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
});



function checkout() {

    if (cart.length === 0) {

        alert("Cart Is Empty");
        return;
    }

    const name =
        document.getElementById("cusName").value;

    const mobile =
        document.getElementById("cusMobile").value;

    const address =
        document.getElementById("cusAddress").value;

    const payment =
        document.getElementById("paymentMode").value;

    if (
        name === "" ||
        mobile === "" ||
        address === "" ||
        payment === ""
    ) {

        alert("Please Fill All Details");
        return;
    }

    document.getElementById("receipt")
        .style.display = "block";

    document.getElementById("rName").innerText = name;
    document.getElementById("rMobile").innerText = mobile;
    document.getElementById("rAddress").innerText = address;
    document.getElementById("rPayment").innerText = payment;

    const rItems = document.getElementById("rItems");

    rItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        rItems.innerHTML += `
        
        <p>
            ${item.name}
            (${item.quantity})
            - ₹${item.price * item.quantity}
        </p>

        `;
    });

    document.getElementById("rTotal")
        .innerText = total;

    showToast("Order Placed Successfully");
}



function printReceipt() {

    const receiptContent =
        document.getElementById("receipt").innerHTML;

    const newWindow =
        window.open("", "", "width=800,height=600");

    newWindow.document.write(`

        <html>

        <head>
            <title>FoodieHub Receipt</title>
        </head>

        <body>
            ${receiptContent}
        </body>

        </html>

    `);

    newWindow.document.close();

    newWindow.print();
}



function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(function () {

        toast.style.display = "none";

    }, 2000);
}



const scrollTopBtn =
    document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 200) {

        scrollTopBtn.style.display = "block";

    } else {

        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
