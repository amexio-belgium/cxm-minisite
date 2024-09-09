const setFocus = ($element, options = {}) => {
  const isFocusable = $element.getAttribute("tabindex");

  if (!isFocusable) {
    $element.setAttribute("tabindex", "-1");
  }

  /**
   * Handle element focus
   */
  function onFocus() {
    $element.addEventListener("blur", onBlur, { once: true });
  }

  /**
   * Handle element blur
   */
  function onBlur() {
    options.onBlur?.call($element);

    if (!isFocusable) {
      $element.removeAttribute("tabindex");
    }
  }

  // Add listener to reset element on blur, after focus
  $element.addEventListener("focus", onFocus, { once: true });

  // Focus element
  options.onBeforeFocus?.call($element);
  $element.focus();
};

export default setFocus;
