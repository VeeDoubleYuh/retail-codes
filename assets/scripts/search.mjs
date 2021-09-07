const relevantCodePieces = document.getElementsByClassName("js-search-area"),
    nav = document.getElementById("search__nav") || null, // Optional Item
    counter = document.getElementById("search__counter") || null, // Optional Item
    counterCurrent = document.getElementById("site__counter--current") || null, // Optional Item
    counterMax = document.getElementById("site__counter--max") || null, // Optional Item
    searchError = document.getElementById("search__error"),
    scrollBehavior = {
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)") ? "auto" : "smooth"
    };
let relevantElements,
    instanceAmount = getInstanceAmount(),
    currentIndex = 0;

/**
 * Find elements with search string
 * Credit: https://stackoverflow.com/a/58357175/9248963
 * @param searchString
 * @returns {*[]}
 */
function getRelevantElements (searchString) {
    const findThis = new RegExp(searchString, "gi"),
        elementList = [];

    [...relevantCodePieces].forEach(area => {
        // Doc: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
        const treeWalker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT);

        while (treeWalker.nextNode()) {
            const element = treeWalker.currentNode;

            if (element.nodeType === Node.TEXT_NODE && element.textContent.match(findThis)) {
                elementList.push(element.parentElement);
            }
        }

    });

    instanceAmount = getInstanceAmount(elementList);

    return elementList;

}

/**
 * Highlight all instances of the given string in the page
 * @param searchString
 * @param form
 */
export function markItems (searchString, form) {

    // If search field is not empty
    if (form.reportValidity()) {

        removeHighlight();

        relevantElements = getRelevantElements(searchString);
        relevantElements.forEach(element => {

            // If string is in a table cell, highlight entire row
            if (element.nodeName === "TD" || element.nodeName === "TH") {
                element = element.parentElement;
            }

            element.classList.add("js-highlighted");
            element.setAttribute("role", "mark");
        });

        toggleSearchError();
        toggleSearchNav();

        // If instances are found
        if (instancesExist()) {
            relevantElements[currentIndex].scrollIntoView(scrollBehavior);
        }
        currentIndex = 0;

    // If instances are found
    if (instancesExist()) {
        relevantElements[currentIndex].scrollIntoView(scrollBehavior);

        updateCounter();
    }

}

/**
 * Remove marked items
 */
export function removeHighlight () {

    // If page search has been used
    if (instancesExist()) {

        // Loop through all programmatically-highlighted elements and remove the highlight class
        [...document.getElementsByClassName("js-highlighted")].forEach(element => {
            element.classList.remove("js-highlighted");
            element.removeAttribute("role");
        });

    }

    // Reset search
    relevantElements = null;
    instanceAmount = 0;
    toggleSearchNav();
    updateCounter();
    searchError.setAttribute("hidden", "");

}

/**
 * Navigate through instances
 */
export function gotoInstance (direction) {

    if (direction === "next" && currentIndex < instanceAmount) {
        currentIndex++;
        relevantElements[currentIndex].scrollIntoView(scrollBehavior);
        updateCounter();
    }
    else if (direction === "prev" && currentIndex > 0) {
        currentIndex--;
        relevantElements[currentIndex].scrollIntoView(scrollBehavior);
        updateCounter();
    }

}

function updateCounter () {
    const currentInstance = currentIndex + 1;

    counter.setAttribute("aria-label", `Instance ${currentIndex + 1} of ${instanceAmount}`);

    if (counterCurrent.textContent !== `${currentInstance}`) {
        counterCurrent.textContent = `${currentInstance}`;
    }
    if (counterMax.textContent !== `${instanceAmount}`) {
        counterMax.textContent = `${instanceAmount}`;
    }
}

/**
 * Toggle Search Navigation
 */
function toggleSearchNav () {

    // Hide Nav and counter
    if (!instancesExist()) {
        nav.setAttribute("hidden", "");
        counter.setAttribute("hidden", "");
    }
    // Show Nav and counter?
    else {
        const navButtons = [...document.getElementsByClassName("search-nav__button")],
            disabled = "disabled";

        // Keep actual navigation buttons disabled
        if (instanceAmount > 1) {

            // Enable navigation buttons
            navButtons.forEach(button => {
                if (button.hasAttribute(disabled)) {
                    button.removeAttribute(disabled);
                }
            })
            // Show counter
            counter.removeAttribute("hidden");

        }
        else {

            // Disable navigation buttons
            navButtons.forEach(button => {
                if (!button.hasAttribute(disabled)) {
                    button.setAttribute(disabled, "");
                }
            })
            // Hide counter
            counter.setAttribute("hidden", "");

        }

        // Show nav area
        nav.removeAttribute("hidden");
    }

}

/**
 * Toggle Search Error
 */
function toggleSearchError () {

    // Hide Nav
    if (instancesExist()) {
        searchError.setAttribute("hidden", "");
    }
    // Show Nav
    else {
        searchError.removeAttribute("hidden");
    }
}

/**
 * Check if instances were found
 * @returns {boolean}
 */
function instancesExist () {
    return !!(relevantElements && instanceAmount > 0);
}

function getInstanceAmount (list = relevantElements) {
    return list ? list.length : 0;
}