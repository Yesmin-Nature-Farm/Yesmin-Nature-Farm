const WHATSAPP_NUMBER = "916296274158";

const prices = {
    "Sonali": {
        "মুরগি": 280,
        "মোরগ": 380
    },

    "Pure Desi": {
        "মুরগি": 330,
        "মোরগ": 500
    },

    "Sonali Egg": {
        "piece": 10
    },

    "Pure Desi Egg": {
        "piece": 15
    }
};


// ORDER NOW

function openOrder(productName) {

    document.getElementById("product").value = productName;

    updateOrderForm();

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}


// UPDATE FORM

function updateOrderForm() {

    const product = document.getElementById("product").value;

    const type = document.getElementById("type");
    const condition = document.getElementById("condition");
    const unit = document.getElementById("unit");

    const isEgg = product.includes("Egg");

    if (isEgg) {

        type.disabled = true;
        condition.disabled = true;

        type.style.opacity = "0.5";
        condition.style.opacity = "0.5";

        unit.innerHTML = `
            <option value="piece">Piece</option>
        `;

        unit.value = "piece";

    } else {

        type.disabled = false;
        condition.disabled = false;

        type.style.opacity = "1";
        condition.style.opacity = "1";

        unit.innerHTML = `
            <option value="kg">Kilogram (kg)</option>
            <option value="bird">Bird</option>
        `;

    }
}


// GET PRICE

function getPrice(product, type, condition) {

    let price = 0;

    if (product === "Sonali") {

        price = prices["Sonali"][type];

        if (condition === "Dressed") {
            price += 20;
        }

    }

    else if (product === "Pure Desi") {

        price = prices["Pure Desi"][type];

        if (condition === "Dressed") {
            price += 20;
        }

    }

    else if (product === "Sonali Egg") {

        price = 10;

    }

    else if (product === "Pure Desi Egg") {

        price = 15;

    }

    return price;
}


// PLACE ORDER

function placeOrder() {

    const product =
        document.getElementById("product").value;

    const type =
        document.getElementById("type").value;

    const condition =
        document.getElementById("condition").value;

    const quantity =
        Number(document.getElementById("quantity").value);

    const unit =
        document.getElementById("unit").value;

    const name =
        document.getElementById("name").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const delivery =
        document.getElementById("delivery").value;

    const payment =
        document.getElementById("payment").value;

    const location =
        document.getElementById("location").value.trim();


    // VALIDATION

    if (!quantity || quantity <= 0) {
        alert("Please enter quantity.");
        return;
    }

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!mobile) {
        alert("Please enter your mobile number.");
        return;
    }

    if (!location) {
        alert("Please enter your delivery location.");
        return;
    }


    // PRICE

    const price =
        getPrice(product, type, condition);

    const subtotal =
        price * quantity;


    // ORDER MESSAGE

    let message =
`🐔 YESMIN NATURE FARM
NEW ORDER

━━━━━━━━━━━━━━━━━━

Product: ${product}
`;

    if (!product.includes("Egg")) {

        message +=
`Type: ${type}
Condition: ${condition}
`;
    }

    message +=
`Quantity: ${quantity}
Unit: ${unit}

Price: ₹${price}/${unit}

Estimated Subtotal: ₹${subtotal}

━━━━━━━━━━━━━━━━━━

Customer Name: ${name}

Mobile: ${mobile}

Delivery / Pickup: ${delivery}

Payment Method: ${payment}

Delivery Location:
${location}

━━━━━━━━━━━━━━━━━━

Please confirm stock, final price and delivery charge.

Thank you.
YESMIN NATURE FARM`;


    // OPEN WHATSAPP DIRECTLY

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.location.href = whatsappURL;
}


// PAGE LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const product =
            document.getElementById("product");

        if (product) {

            product.addEventListener(
                "change",
                updateOrderForm
            );

            updateOrderForm();
        }

    }
);