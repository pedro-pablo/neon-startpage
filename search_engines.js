const DEFAULT_SEARCH_ENGINE = 'http://duckduckgo.com/?q='

const SEARCH_ENGINES = {
    '!yt': {
        description: 'Invidious',
        url: 'https://invidious.xyz/search?q='
    },
    '!mal': {
        description: 'My Anime List',
        url: 'https://myanimelist.net/search/all?q='
    },
    '!reddit': {
        description: 'reddit',
        url: 'https://old.reddit.com/search/?q='
    },
    '!gi': {
        description: 'Google Images',
        url: 'https://www.google.com/images?q='
    },
	'!gt': {
		description: 'Google Translate',
		url: 'https://translate.google.com/?q='
	}
};