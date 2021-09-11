export const userSettings = window.localStorage;
const theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

class UserSettings {

    constructor () {
        // Set default theme
        if (!userSettings.getItem("store")) {
            userSettings.setItem("store", "shop smart");
        }
        // Set default theme
        if (!userSettings.getItem("theme")) {
            userSettings.setItem("theme", theme);
        }
    }

    // Update to opposite theme
    async updateTheme () {
        const themeUpdater = await import("/retail-plu-codes/assets/scripts/theme-updater.min.mjs");

        themeUpdater.default(true);
    }

    // Update to chosen store
    async updateStore (newStore = userSettings.getItem("store")) {
        const storeUpdater = await import("/retail-plu-codes/assets/scripts/store-updater.min.mjs");

        storeUpdater.default(newStore);
    }

}

export default UserSettings = new UserSettings();