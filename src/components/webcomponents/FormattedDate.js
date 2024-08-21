class FormattedDate extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = this.createElement();
  }

  attributeChangedCallback() {
    this.shadowRoot.innerHTML = this.createElement();
  }

  get date() {
    return new Date(this.getAttribute("date"));
  }

  get classes() {
    return this.getAttribute("classes");
  }

  createElement() {
    return `
        <time datetime="${this.date.toISOString()}" class="${this.classes}">
            ${this.date.toLocaleDateString("en-uk", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </time>
      `;
  }
}

if ("customElements" in window) {
  customElements.define("formatted-date", FormattedDate);
}
