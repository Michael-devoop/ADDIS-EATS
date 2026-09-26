const PHONE_REGEX = /^(\+251|0)9\d{8}$/; // Ethiopian mobile format

export function validateCheckoutForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!PHONE_REGEX.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number, e.g. 0912345678.";
  }

  if (!form.area.trim()) {
    errors.area = "Delivery area is required.";
  }

  return errors;
}