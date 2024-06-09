// function clearCartAfterOrderPlaced() {
//   const placeOrderBtn = document.querySelector("._placeOrder");

//   if (placeOrderBtn) {
//     placeOrderBtn.addEventListener("click", () => {
//       localStorage.setItem("orderConfirmed", "true");
//       const orderConfirmed = localStorage.getItem("orderConfirmed");
//       console.log("orderConfirmed set to true in localStorage");

//       if (orderConfirmed) {
//         window.location.href = "./checkout-success.html";

//         setTimeout(() => {
//           localStorage.removeItem("orderConfirmed");
//           console.log("orderConfirmed removed from localStorage");
//         }, 5000);
//       } else {
//         console.log("Failed to set orderConfirmed true in localStorage");
//       }
//     });
//   }
// }

// function checkoutSuccess() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const orderConfirmed = localStorage.getItem("orderConfirmed");
//     console.log("orderConfirmed from localStorage:", orderConfirmed);

//     if (orderConfirmed === "true") {
//       console.log("Order confirmed, displaying alert...");
//       alertMessage("Order confirmed!", "success");
//       // localStorage.removeItem("orderConfirmed");
//     } else {
//       console.log("checkoutSuccess did not work");
//     }
//   });
// }
// clearCartAfterOrderPlaced();
// checkoutSuccess();

//-------------------
