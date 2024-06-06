import setFocus from "@lib/setFocus.js";

const lang = document.documentElement.getAttribute('lang');
const hbsptContactForm = {
    init: function (lang) {
        let script = document.createElement('script');
        script.charset = 'utf-8';
        script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
        script.addEventListener('load', function () { hbsptContactForm.initForm(lang) }, false);
        document.head.appendChild(script);
    },
    initForm: function (lang) {
        let formId = "0bbb8a62-0b4c-42f5-820a-f7efe483b6e7";
        lang == "fr" &&
            (formId =
                "e0b390be-6491-40c2-9045-33ef9ed28f96");
        lang == "nl" &&
            (formId =
                "71312006-dc15-4ec1-9b49-64c2babbd2f7");

        // @ts-ignore
        if (hbspt) {
            hbspt.forms.create({
                region: "eu1",
                portalId: "143190687",
                formId,
                cssRequired: "",
                cssClass: "cxm-hbs-form",
                css: "",
                target: "#cxm-contact-form",
                onFormReady: function () {
                    const formWrapper = document.getElementById("cxm-contact-form");
                    const formSkeleton = document.getElementById("contact-form-placeholder");
                    formWrapper?.setAttribute('aria-busy', "false");
                    formSkeleton?.classList.add("hidden");
                    formSkeleton?.setAttribute("aria-hidden", "true");
                },
                onFormFailedValidation: function (form) {
                    setTimeout(() => {
                        const errorSummary = form.querySelector('.hs_error_rollup');

                        if (errorSummary) {
                            setFocus(errorSummary, {
                                onBeforeFocus() {
                                    errorSummary.classList.add("error-summary-has-focus");
                                },
                                onBlur() {
                                    errorSummary.classList.remove("error-summary-has-focus");
                                },
                            });
                        }
                    }, 300);
                },
                onFormSubmitted: function (succesMessage) {
                    setTimeout(() => {
                        setFocus(succesMessage, {
                            onBeforeFocus() {
                                succesMessage.classList.add("succes-message-has-focus");
                            },
                            onBlur() {
                                succesMessage.classList.remove("succes-message-has-focus");
                            },
                        });
                    }, 300);
                },
            })
        }
    },
};
hbsptContactForm.init(lang);
