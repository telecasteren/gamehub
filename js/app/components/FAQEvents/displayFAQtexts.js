import { fetchFAQData } from "/js/utils/api/text/fetchFAQdata.js";
import { faqToggleMessage } from "/js/app/components/FAQEvents/faqToggleMessage.js";
import { loadError } from "/js/utils/auth/messages.js";

export async function displayFAQtexts() {
  const subscriptionFAQ = document.querySelector("#subscriptionsText");
  const onlineSafetyFAQ = document.querySelector("#onlineSafetyText");
  const deliveryReturnsFAQ = document.querySelector("#deliveryReturnsText");
  const contactForm = document.querySelector(".contactForm-container");

  try {
    const faqData = await fetchFAQData();

    if (faqData && Array.isArray(faqData.faqTexts)) {
      faqData.faqTexts.forEach((faq) => {
        const title = faq.title.toLowerCase();
        const content = faq.content;

        if (title.includes("subscription")) {
          subscriptionFAQ.addEventListener("click", () => {
            faqToggleMessage(content, "info");

            contactForm.style.display = "none";
            subscriptionFAQ.style.fontWeight = "bold";
          });
        }

        if (title.includes("online safety")) {
          onlineSafetyFAQ.addEventListener("click", () => {
            faqToggleMessage(content, "info");

            contactForm.style.display = "none";
            onlineSafetyFAQ.style.fontWeight = "bold";
          });
        }

        if (title.includes("delivery")) {
          deliveryReturnsFAQ.addEventListener("click", () => {
            faqToggleMessage(content, "info");

            contactForm.style.display = "none";
            deliveryReturnsFAQ.style.fontWeight = "bold";
          });
        }
      });
    }
  } catch (error) {
    loadError("Something went wrong when fetching FAQ's");
  }
}
