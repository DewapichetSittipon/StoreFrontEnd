function validateEmail(value: string) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
}

function validatePassword(value: string) {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
}

function validatePhone(value: string) {
  return /^(\+66|0)[0-9]{9}$/.test(value);
}

function validateNumber(value: string) {
  return /^[0-9]+$/.test(value);
}

function validateAlphabet(value: string) {
  return /^[\u0E00-\u0E7Fa-zA-Z\s]+$/.test(value);
}

function validateSpecialAlphabet(value: string) {
  return /^[\u0E00-\u0E7Fa-zA-Z0-9!@#\$%/\^\&*\)\(+=._-]+$/g.test(value);
}

function validateBankAccount(value: string) {
  return /^\d{8,17}$/.test(value);
}

function validateEnglish(value: string) {
  return /^[A-Za-z]{2,25} +[A-Za-z]{2,25}$/.test(value);
}

function validateNameThaiAndEng(value: string) {
  return /^[A-Za-z\u0E00-\u0E7F]{2,25} +[A-Za-z\u0E00-\u0E7F]{2,25}$/.test(value);
}

function validateSpaceStart(value: string) {
  return /^\s/g.test(value);
}

function validateTaxNumber(value: string) {
  return /^\d{13}$/.test(value);
}

function validateNumberPercentage(value: string) {
  return /^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)$/.test(value);
}

function isCreditCard(value: string) {
  const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  const cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  const cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  const mastercard = new RegExp('^5[1-5][0-9]{14}$');
  const mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  const disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  const disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  const disco3 = new RegExp('^6[45]-[0-9]{14}[0-9]*$');

  const diners = new RegExp('^3[0689][0-9]-{12}[0-9]*$');
  const jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  if (visa.test(value)) {
    return true;
  }

  if (mastercard.test(value) || mastercard2.test(value)) {
    return true;
  }

  if (disco1.test(value) || disco2.test(value) || disco3.test(value)) {
    return true;
  }

  if (diners.test(value)) {
    return true;
  }

  if (jcb.test(value)) {
    return true;
  }

  return cup1.test(value) || cup2.test(value);
}

function validateAlphabetWithSpace(value: string) {
  return /^(?!\s)(?!.*\s\s)^[\u0E00-\u0E7Fa-zA-Z\s.]+(?<!\s)$/g.test(value);
}

function validateSpecialAlphabetWithSpace(value: string) {
  return /^(?!\s)(?!.*\s\s)^[\u0E00-\u0E7Fa-zA-Z\d\s!@#$%/^&*)(+=._-]+(?<!\s)$/g.test(value);
}

function validateAlphanumericWithSpaceAndDot(value: string) {
  return /^(?!\s)(?!.*\s\s)^[\u0E00-\u0E7Fa-zA-Z0-9.\s]+(?<!\s)$/g.test(value);
}

function validateRedeemCodeFormat(value: string) {
  return /^[A-Za-z0-9]{10}$/.test(value);
}

const validateCurrency = (value: string) =>
  // Validate that the input is a valid currency amount
  /^(\d{1,3})(,\d{3})*(\.\d+)?$/.test(value);

const regex = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateAlphabet,
  validateSpecialAlphabet,
  isCreditCard,
  validateNumber,
  validateBankAccount,
  validateEnglish,
  validateNameThaiAndEng,
  validateSpaceStart,
  validateAlphabetWithSpace,
  validateSpecialAlphabetWithSpace,
  validateAlphanumericWithSpaceAndDot,
  validateRedeemCodeFormat,
  validateCurrency,
  validateTaxNumber,
  validateNumberPercentage,
};

export default regex;