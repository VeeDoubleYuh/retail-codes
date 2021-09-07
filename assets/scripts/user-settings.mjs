export const userSettings = window.localStorage;
const theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

class UserSettings {

    constructor () {
        // Set theme
        if (!userSettings.getItem("theme")) {
            userSettings.setItem("theme", theme);
        }
    }

    // Update to opposite theme
    async updateTheme () {
        const themeUpdater = await import("/retail-plu-codes/assets/scripts/theme-updater.min.mjs");

        themeUpdater.default(true);
    }

}

/**
 * Get value from key.
 * @param key
 * @returns {string}
 */
function getInfo (key) {
    return userSettings.getItem(key);
}

export default UserSettings = new UserSettings();