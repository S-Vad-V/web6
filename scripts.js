function updatePrice() {
    let same = document.getElementsByName("prodType");
    let select = same[0];
    let price = 0;
    let prices = getPrices();
    let buf1 = 0;
    let buf2 = 0;
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
        price = prices.prodTypes[priceIndex];
    }
    let radioss = document.getElementById("radio");
    if (select.value == "3" || select.value == "4") radioss.style.display = "block";
    else radioss.style.display = "none";
    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function (radio) {
        if (radio.checked) {
            let optionPrice = prices.prodOptions[radio.value];
            if (optionPrice !== undefined) {
                price += optionPrice;
                buf1 += optionPrice;
            }
        }
    });
    let checkDiv = document.getElementById("check");
    if (select.value == "1" || select.value == "2") checkDiv.style.display = "block";
    else checkDiv.style.display = "none";
    let checkboxes = document.querySelectorAll("#check input");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            let propPrice = prices.prodProperties[checkbox.name];
            if (propPrice !== undefined) {
                price += propPrice;
                buf2 += propPrice;
            }
        }
    });
   
   
    if (select.value == "5")
        price = price - buf1 - buf2;
    if (select.value == "1" || select.value == "2")
        price = price - buf1;
    if (select.value == "3" || select.value == "4")
        price = price - buf2;

    let num = document.getElementById("numofclass").value;
    if (typeof num === 'undefined') num = 0;
    price *= num;

    let prodPrice = document.getElementById("prodPrice");
    prodPrice.innerHTML = price + " RUB";

}

function getPrices() {
    return {
        prodTypes: [6000, 2500, 1000, 600, 1200],
        prodOptions: {
            option1: 150,
            option2: 100,
            option3: 110,
        },
        prodProperties: {
            prop1: 350,
            prop2: 300,
        }
    };
}

window.addEventListener('DOMContentLoaded', function (event) {
    let radioDiv = document.getElementById("radio");
    radioDiv.style.display = "none";
    let s = document.getElementsByName("prodType");
    let select = s[0];
    select.addEventListener("change", function (event) {
        let target = event.target;
        console.log(target.value);
        updatePrice();
    });

    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function (radio) {
        radio.addEventListener("change", function (event) {
            let r = event.target;
            console.log(r.value);
            updatePrice();
        });
    });

    let checkboxes = document.querySelectorAll("#check input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function (event) {
            let c = event.target;
            console.log(c.name);
            console.log(c.value);
            updatePrice();
        });
    });

    updatePrice();
});
