const CLOCK_ELEMENT = document.getElementById('clock');
const DAY_PROGRESS_ELEMENT = document.getElementById('day-progress');
const SEARCH_BUTTON_ELEMENT = document.getElementById('search-btn');
const SEARCH_BAR_ELEMENT = document.getElementById('search-bar');
const SEARCH_ENGINES_ELEMENT = document.getElementById('search-engines-wrapper');
const SHORTCUT_BUTTON_ELEMENT = document.getElementById('shortcuts-btn');
const CLEAR_SEARCH_BUTTON_ELEMENT = document.getElementById('clear-search-btn');
const BOOKMARKS_WRAPPER_ELEMENT = document.getElementById('bookmarks');

function updateClock() {
    let date = new Date();
    CLOCK_ELEMENT.innerHTML = date.toLocaleString().replace(',', '');
    let progress = ((date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()) / 864;
    DAY_PROGRESS_ELEMENT.style.width = '' + progress + '%';
}

function redirect(newLocation) {
    window.location.href = newLocation;
}

function search() {
    let searchQuery = SEARCH_BAR_ELEMENT.value;

    if (!searchQuery) return;

    let isUrl = true;
    let url;
    
    try {
        url = new URL(searchQuery);
    } catch (e) {
        isUrl = false;
    }

    if (isUrl) {
        redirect(url.href);
        return;
    }

    let searchEngineShortcut = searchQuery.substr(0, searchQuery.indexOf(' '));
    let searchEngine = SEARCH_ENGINES[searchEngineShortcut];
    searchQuery = searchQuery.trim();

    if (!searchEngine) {
        searchEngine = {};
        searchEngine.url = DEFAULT_SEARCH_ENGINE;
    } else {
        searchQuery = searchQuery.substr(searchEngineShortcut.length + 1);
    }

    redirect(searchEngine.url + encodeURIComponent(searchQuery));
}

function unfocus() {
    document.documentElement.focus();
    document.activeElement.blur();
}

function addSearchShortcut(shortcut) {
    SEARCH_BAR_ELEMENT.value += shortcut + ' ';
    SEARCH_BAR_ELEMENT.focus();
}

function showHideShortcuts() {
    let show = SEARCH_ENGINES_ELEMENT.style.display == 'none';
    SEARCH_ENGINES_ELEMENT.style.display = show ? 'flex' : 'none';
    if (show) {
        SEARCH_ENGINES_ELEMENT.firstChild.focus();
    }
}

function handleGlobalKeydown(ev) {
    switch (ev.key) {
        case 'Escape':
            unfocus();
            break;

        case 'F1':
            showHideShortcuts();
            ev.preventDefault();
            break;

        case 'F2':
            CLEAR_SEARCH_BUTTON_ELEMENT.click();
            ev.preventDefault();
            break;

        case 'F3':
            SEARCH_BAR_ELEMENT.focus();
            ev.preventDefault();
            break;

        case 'F4':
            BOOKMARKS_WRAPPER_ELEMENT.firstChild.lastChild.firstChild.focus();
            ev.preventDefault();
            break;

    }
}

BOOKMARK_CATEGORIES.forEach(bookmarkCategory => {
    let categoryContainer = document.createElement('div');
    categoryContainer.className = 'bookmark-category';
    categoryContainer.style.color = bookmarkCategory.color;

    let categoryTitle = document.createElement('div');
    categoryTitle.className = 'bookmark-category-title';
    categoryTitle.style.color = bookmarkCategory.color;
    categoryTitle.innerText = bookmarkCategory.name;

    categoryContainer.appendChild(categoryTitle);

    let linksWrapper = document.createElement('div');
    linksWrapper.className = 'bookmark-links-wrapper';

    bookmarkCategory.bookmarks.forEach(bookmark => {
        let bookmarkLink = document.createElement('a');
        bookmarkLink.className = 'bookmark-link';
        bookmarkLink.href = bookmark.url;
        bookmarkLink.innerText = bookmark.title;
        linksWrapper.appendChild(bookmarkLink);
    });

    categoryContainer.appendChild(linksWrapper);
    BOOKMARKS_WRAPPER_ELEMENT.appendChild(categoryContainer);
});

// Creates buttons for each search engine in SEARCH_ENGINES (declared in search_engines.js)
Object.keys(SEARCH_ENGINES).forEach(searchEngine => {
    let searchEngineButton = document.createElement('button');
    searchEngineButton.className = 'neon-button';
    searchEngineButton.innerText = searchEngine + ': ' + SEARCH_ENGINES[searchEngine].description;
    searchEngineButton.onclick = () => {
        addSearchShortcut(searchEngine)
    };

    SEARCH_ENGINES_ELEMENT.appendChild(searchEngineButton);
});

SEARCH_BAR_ELEMENT.addEventListener('keydown', ev => {
    if (ev.key == 'Enter') {
        search();
    }
});

SEARCH_BUTTON_ELEMENT.addEventListener('click', () => {
    search();
});

SHORTCUT_BUTTON_ELEMENT.addEventListener('click', () => {
    showHideShortcuts();
});

CLEAR_SEARCH_BUTTON_ELEMENT.addEventListener('click', () => {
    SEARCH_BAR_ELEMENT.value = '';
});

document.addEventListener('keydown', ev => {
    handleGlobalKeydown(ev);
});

updateClock();
window.setInterval(() => {
    updateClock();
}, 200);

updateWeather();
window.setInterval(() => {
    updateWeather();
}, WEATHER_UPDATE_DELAY_MS);

updateCurrency();
window.setInterval(() => {
    updateCurrency();
}, CURRENCY_UPDATE_DELAY_MS);

updateIp();
window.setInterval(() => {
    updateIp();
}, IPIFY_UPDATE_DELAY_MS);

SEARCH_BAR_ELEMENT.focus();