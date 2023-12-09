export function submitForm<T>(data?: T, validateHasNameOnly?: boolean) {
  if (validateHasNameOnly) {
    document.dispatchEvent(new CustomEvent('onSubmitCustom', { detail: { data, hasNameOnly: true } }));
  } else {
    document.dispatchEvent(new CustomEvent('onSubmitCustom', { detail: { data, hasNameOnly: false } }));
  }
}