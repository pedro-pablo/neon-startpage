const CURRENCYCONVERTERAPI_URL = `https://free.currconv.com/api/v7/convert?q=${CURRENCY_FROM.code}_${CURRENCY_TO.code}&compact=ultra&apiKey=${CURRENCYCONVERTERAPI_API_KEY}`;
const INFO_CURRENCY_ELEMENT = document.getElementById('info-currency');

function updateCurrencyDisplay(currencyData) {
    INFO_CURRENCY_ELEMENT.innerHTML = `${CURRENCY_TO.symbol}${Number(currencyData[`${CURRENCY_FROM.code}_${CURRENCY_TO.code}`]).toFixed(2)}`
}

function updateCurrency() {
    if (WEATHER_UPDATE_DELAY_MS < 60000) {
        console.warn('Currency API update delay is too short (<1 min). Your API key might be blocked.');
    }

    if (CURRENCYCONVERTERAPI_API_KEY && CURRENCY_FROM && CURRENCY_TO && CURRENCY_FROM.code && CURRENCY_FROM.symbol && CURRENCY_TO.code && CURRENCY_TO.symbol) {
        updateApi('CURRENCY', CURRENCYCONVERTERAPI_URL, 'currency', CURRENCY_UPDATE_DELAY_MS, updateCurrencyDisplay);
    } else {
        console.warn('Currency Converter API key or from/to not set. Currency information is unavailable.');
        WEATHER_WRAPPER_ELEMENT.style.visibility = 'hidden';
    }
}