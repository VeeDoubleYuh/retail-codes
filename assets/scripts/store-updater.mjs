import {userSettings} from "/retail-plu-codes/assets/scripts/user-settings.min.mjs";

const storeSelector = document.getElementById("site__store-select"),
    logoElement = document.getElementById("site__logo"),
    logoClassPrefix = "site__logo--",
    titleConstant = " – PLU Code Cheat Sheet";

const availableStores = {
    "shop smart": {
        name : "Shop Smart™",
        logo: {
            height: "162.9",
            width: "975.9"
        }
    },
    "rays"      : {
        name : "Rays",
        logo: {
            height: "78.91",
            width: "160"
        }
    }
};

/**
 * Update Store
 * @param newStore
 */
export default function (newStore = null) {

    const codeName = newStore.replaceAll(" ", "-"), // Teehee
        classes = logoElement.classList,
        newStoreInfo = availableStores[newStore];

    document.title = `${newStoreInfo.name}${titleConstant}`;
    document.querySelector("[name='description']").setAttribute("content", `Looking for a ${newStoreInfo.name} PLU code? Check here!`);

    // Logo should be an SVG. No srcset necessary.
    logoElement.src = `/retail-plu-codes/assets/images/${codeName}-logo.svg`;
    logoElement.alt = newStoreInfo.name;
    logoElement.height = newStoreInfo.logo.height;
    logoElement.width = newStoreInfo.logo.width;

    for (let i = 0; i < classes.length; i++) {
        if (classes[i].match(/site__logo--*./)) {
            classes.remove(classes[i]);
        }
    }

    classes.add(`${logoClassPrefix}${codeName}`);

    userSettings.setItem("store", newStore);

}