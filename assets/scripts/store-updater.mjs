import {userSettings} from "/retail-plu-codes/assets/scripts/user-settings.min.mjs";

const storeSelector = document.getElementById("site__store-select"),
    logoElement = document.getElementById("site__logo"),
    logoClassPrefix = "site__logo--";

const availableStores = {
    "shop smart": {
        name : "Shop Smart™"
    },
    "rays"      : {
        name : "Rays"
    }
};

/**
 * Update Store
 * @param newStore
 */
export default function (newStore = null) {

    const codeName = newStore.replaceAll(" ", "-"), // Teehee
        classes = logoElement.classList;

    logoElement.src = `/retail-plu-codes/assets/images/${codeName}-logo.svg`;
    logoElement.alt = availableStores[newStore].name;

    for (let i = 0; i < classes.length; i++) {
        if (classes[i].match(/site__logo--*./)) {
            classes.remove(classes[i]);
        }
    }

    classes.add(`${logoClassPrefix}${codeName}`);

    userSettings.setItem("store", newStore);

}