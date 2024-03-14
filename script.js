const base_url = "https://open.er-api.com/v6/latest";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else {
            if (select.name === "to" && currCode === "INR") {
                newOption.selected = "selected";
            }
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSourceLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSourceLink;
};

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === " " || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    const url = `${base_url}?symbols=${fromCurr.value},${toCurr.value}&base=USD&apikey=YOUR_API_KEY`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});
