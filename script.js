"use strict";

(() => {
    const input = document.getElementById("userInput");
    const button = document.getElementById("submitButton");
    const output = document.getElementById("output");

    if (!(input instanceof HTMLInputElement) ||
        !(button instanceof HTMLButtonElement) ||
        !(output instanceof HTMLElement)) {
        return;
    }

    const MAX_LENGTH = 100;
    const MIN_LENGTH = 1;

    input.maxLength = MAX_LENGTH;
    input.autocomplete = "off";
    input.spellcheck = false;

    const normalize = (value) =>
        value
            .normalize("NFKC")
            .replace(/[\u0000-\u001F\u007F]/g, "")
            .trim();

    const isValid = (value) => {
        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            return false;
        }

        if (/[\u202A-\u202E\u2066-\u2069]/u.test(value)) {
            return false;
        }

        return true;
    };

    const showMessage = (message) => {
        output.textContent = message;
    };

    button.addEventListener("click", () => {
        const name = normalize(input.value);

        if (!isValid(name)) {
            showMessage("Neispravan unos.");
            return;
        }

        showMessage(`Zdravo ${name}`);
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            button.click();
        }
    });
})();
