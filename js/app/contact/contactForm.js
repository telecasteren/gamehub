// const contactFormContainer = document.querySelector(".contactForm-container");
import { contactFormContainer } from "/js/utils/general/constants.js";

export function contactForm() {
  const formContainer = document.createElement("div");
  formContainer.className = "form-container";

  const form = document.createElement("form");
  form.action = "/navigate/contact/message-delivery/";
  form.className = "contactForm";

  function createInput(
    type,
    id,
    name,
    placeholder,
    required = false,
    autocomplete = ""
  ) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;
    if (required) input.required = true;
    if (autocomplete) input.setAttribute("autocomplete", autocomplete);
    return input;
  }

  function createLabel(forId, text) {
    const label = document.createElement("label");
    label.htmlFor = forId;
    label.hidden = true;
    label.textContent = text;
    return label;
  }

  form.appendChild(createLabel("fname", "Name"));
  form.appendChild(
    createInput("text", "fname", "fullname", "Your name", true, "name")
  );

  form.appendChild(createLabel("email", "Email"));
  form.appendChild(
    createInput("email", "email", "email", "example@email.com", false, "email")
  );

  form.appendChild(createLabel("inquiry", "Subject"));
  const select = document.createElement("select");
  select.id = "inquiry";
  select.name = "inquiry";
  select.required = true;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  defaultOption.textContent = "Subject";
  select.appendChild(defaultOption);

  const options = [
    { value: "login", text: "Problems with login" },
    { value: "work", text: "Returns" },
    { value: "other", text: "Other" },
  ];

  options.forEach(({ value, text }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  });

  form.appendChild(select);

  form.appendChild(createLabel("message", "Message"));
  const textarea = document.createElement("textarea");
  textarea.id = "message";
  textarea.name = "message";
  textarea.placeholder = "Your message here..";
  textarea.style.height = "200px";
  textarea.required = true;
  form.appendChild(textarea);

  form.appendChild(createLabel("submit", "Submit"));
  const submit = createInput("submit", "contactFormSubmit", "", "Send");
  form.appendChild(submit);

  formContainer.appendChild(form);
  contactFormContainer.appendChild(formContainer);
}
