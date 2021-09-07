import {userSettings} from "./user-settings.mjs";

const overrideId = "js-color-override",
    existingOverride = document.getElementById(overrideId),
    newColors = document.createElement("link");

/**
 * Updates the current theme.
 * @param update
 */
export default function (update = false) {
    let href = "/retail-plu-codes/assets/styles/";

    newColors.setAttribute("rel", "stylesheet");
    newColors.setAttribute("id", overrideId);

    // Choose overriding colors
    if (!update) {
        if (userSettings.getItem("theme") === "light") {
            href = `${href}colors--light.css`;
        }
        else {
            href = `${href}colors--dark.css`;
        }
    }
    else {

        if (userSettings.getItem("theme") === "light") {
            href = `${href}colors--dark.css`;
        }
        else {
            href = `${href}colors--light.css`;
        }

    }

    newColors.setAttribute("href", href);

    // Insert override colors
    if (!existingOverride) {
        document.head.insertAdjacentElement("beforeend", newColors);
    }
    else {
        existingOverride.replaceWith(newColors);
    }

    // Update localstorage
    if (update) {
        userSettings.setItem("theme", (userSettings.getItem("theme") === "light" ? "dark" : "light"));
    }

}