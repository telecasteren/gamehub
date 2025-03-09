import { cardDetailsHtml } from "/js/app/cart/checkout/paymentMethods/cardHtml.js";
import { calculateTotalPrice } from "/js/app/cart/checkout/price/calculateTotalPrice.js";

export function generateCheckoutContent() {
  const checkoutContent = document.querySelector(".checkout-content");
  if (!checkoutContent) return;

  checkoutContent.innerHTML = "";

  const checkoutDetails = document.createElement("div");
  checkoutDetails.classList.add("checkoutDetails");

  const cartElements = document.createElement("div");
  cartElements.classList.add("cart-elements");

  const cartSection = document.createElement("div");
  cartSection.classList.add("cart-section");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  cartSection.appendChild(loader);

  const summaryHeading = document.createElement("h3");
  summaryHeading.textContent = "Summary";

  const subtotalText = document.createElement("p");
  subtotalText.id = "subtotal";
  subtotalText.textContent = "Subtotal";

  const subtotalPrice = document.createElement("div");
  subtotalPrice.id = "subtotal-price";

  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const form = document.createElement("form");
  form.setAttribute("action", "php");

  const formTitle = document.createElement("h2");
  formTitle.classList.add("formTitle");
  formTitle.textContent = "Delivery details";

  const inputFields = [
    {
      id: "fname",
      type: "text",
      name: "firstname",
      placeholder: "your first name",
      required: true,
      autocomplete: "given-name",
    },
    {
      id: "lname",
      type: "text",
      name: "lastname",
      placeholder: "your last name",
      required: true,
      autocomplete: "family-name",
    },
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "your email address",
      autocomplete: "email",
    },
    {
      type: "tel",
      name: "phone",
      placeholder: "phone (optional)",
      autocomplete: "on",
    },
    {
      class: "deliveryAddress",
      type: "text",
      name: "address",
      placeholder: "delivery address *",
      required: true,
      autocomplete: "on",
    },
    {
      class: "zipCode",
      type: "text",
      name: "zipCode",
      placeholder: "postal code *",
      required: true,
      autocomplete: "on",
    },
  ];

  inputFields.forEach((field) => {
    const input = document.createElement("input");
    Object.keys(field).forEach((key) => input.setAttribute(key, field[key]));
    form.appendChild(input);
  });

  formContainer.appendChild(formTitle);
  formContainer.appendChild(form);

  const paymentMethodContainer = document.createElement("div");
  paymentMethodContainer.classList.add("paymentMethodImgs-container");

  const paymentMethods = [
    {
      src: "/images/payment-imgs/eyJwYXRoIjoiZnJvbnRpZnlcL2FjY291bnRzXC9jMlwvMTczMDkwXC9wcm9qZWN0c1wvMjkzMjE0XC9hc3NldHNcLzNlXC81MzA0MzU5XC9jNWYxZWUyYmNjNzFlYjNlMjlhZTU0YTU5YTcyM2FhOC0xNjE2NTA0ODgzLnBuZyJ9_fronti.avif",
      alt: "Vipps",
    },
    { src: "/images/payment-imgs/Klarna-Logo.wine_.png", alt: "Klarna" },
    { src: "/images/payment-imgs/visa-mastercard.jpg", alt: "Visa/Mastercard" },
  ];

  paymentMethods.forEach((method) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("pMethod-img");
    const img = document.createElement("img");
    img.src = method.src;
    img.alt = method.alt;
    imgContainer.appendChild(img);
    paymentMethodContainer.appendChild(imgContainer);
  });

  const paymentFormDiv = document.createElement("div");
  paymentFormDiv.classList.add("paymentForm");

  const paymentForm = document.createElement("form");

  const paymentFormTitle = document.createElement("h2");
  paymentFormTitle.classList.add("formTitle");
  paymentFormTitle.textContent = "Payment details";

  const label = document.createElement("label");
  label.setAttribute("for", "payment");
  label.hidden = true;
  label.textContent = "Card provider";

  const select = document.createElement("select");
  select.name = "payment";
  select.id = "paymentMethod";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  defaultOption.textContent = "Choose payment method";
  select.appendChild(defaultOption);

  const paymentOptions = [
    { value: "option-one", text: "Visa Debit" },
    { value: "option-two", text: "Mastercard" },
    { value: "option-three", text: "American Express" },
    { value: "option-four", text: "Vipps" },
    { value: "option-five", text: "Klarna" },
  ];

  paymentOptions.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    select.appendChild(option);
  });

  const cardDetails = document.createElement("div");
  cardDetails.classList.add("cardDetails");

  const vippsDetails = document.createElement("div");
  vippsDetails.classList.add("vippsDetails");

  const klarnaDetails = document.createElement("div");
  klarnaDetails.classList.add("klarnaDetails");

  paymentForm.append(
    paymentFormTitle,
    label,
    select,
    cardDetails,
    vippsDetails,
    klarnaDetails
  );
  paymentFormDiv.appendChild(paymentForm);

  const deliveryMethod = document.createElement("div");
  deliveryMethod.classList.add("delivery-method");

  const deliveryLabel = document.createElement("p");
  deliveryLabel.classList.add("delivery-label");
  deliveryLabel.innerHTML = "<b>Delivery method:</b>";
  deliveryMethod.appendChild(deliveryLabel);

  const deliveryOptions = [
    { label: "Pick-up: 0,-", price: "0" },
    { label: "Post-office: 59,-", price: "59" },
    { label: "Home-delivery: 99,-", price: "99" },
  ];

  deliveryOptions.forEach((option) => {
    const label = document.createElement("label");
    label.classList.add("delivery-text");
    label.textContent = option.label;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "delivery";
    input.classList.add("radioBTN");
    input.dataset.price = option.price;

    deliveryMethod.appendChild(label);
    deliveryMethod.appendChild(input);
  });

  const promoLabel = document.createElement("div");
  promoLabel.classList.add("promo-label");
  promoLabel.innerHTML = "<b><label for='promoInput'>Promo-code:</label></b>";

  const promoInput = document.createElement("input");
  promoInput.type = "text";
  promoInput.id = "promoInput";
  promoInput.classList.add("promo-input");

  const totalSum = document.createElement("div");
  totalSum.classList.add("totalSum");
  totalSum.innerHTML =
    "<p class='total-price'><b>Total incl.mva (VAT)</b></p><div id='total-price'></div>";

  const placeOrderBtn = document.createElement("button");
  placeOrderBtn.classList.add("checkoutBTN", "_placeOrder");
  placeOrderBtn.textContent = "Place order";

  const continueShoppingBtn = document.createElement("button");
  continueShoppingBtn.classList.add("checkoutBTN", "_allGames");
  continueShoppingBtn.textContent = "Continue shopping";

  cartElements.append(
    cartSection,
    summaryHeading,
    subtotalText,
    subtotalPrice,
    formContainer,
    paymentMethodContainer
  );
  checkoutDetails.append(
    cartElements,
    paymentFormDiv,
    deliveryMethod,
    promoLabel,
    promoInput,
    totalSum
  );
  checkoutContent.append(checkoutDetails, placeOrderBtn, continueShoppingBtn);

  if (totalSum) {
    calculateTotalPrice();
  }

  if (document.querySelector(".cardDetails")) {
    cardDetailsHtml();
  }
}
