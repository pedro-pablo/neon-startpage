/**
 * Updates the data from an API. Returns the API data from local storage (if not expired) or fetched from the API URL. 
 * The callback method is called after a successful fetch of API data occurs or current data is stil valid, passing the fetched/stored data into it. 
 */
function updateApi(apiName, apiUrl, storageName, updateDelay, callBackMethod) {
    try {
        if (window.localStorage) {
            let storedApiData = window.localStorage.getItem(storageName);
            if (storedApiData) {
                let validData;
                try {
                    storedApiData = JSON.parse(storedApiData);
                    validData = true;
                } catch (e) {
                    validData = false;
                    console.error(`${apiName} JSON in local storage is invalid: ${e}`);
                    console.info(`Attempting to fetch new data for ${apiName} API`)
                    localStorage.removeItem(storageName);
                }

                if (validData && ('expiration' in storedApiData)) {
                    if (new Date().getTime() < storedApiData.expiration) {
                        console.info(`${apiName} data still valid`);
                        try {
                            callBackMethod(storedApiData);
                        }
                        catch (e) {
                            throw e;
                        }
                        return;
                    } else {
                        console.info(`${apiName} data is expired`);
                    }
                }
            }
        } else {
            console.warn('Local storage is disabled. API data will be fetched with every page load, resulting in more frequent API calls.');
        }
    } catch (e) {
        if (e === 'No stock data') {
            throw e;
        }
        console.error(`Failed to update ${apiName} data:\n${e}`);
        return;
    }

    console.info(`Fetching ${apiName} data...`);
    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((fetchedData) => {
                if (updateDelay) {
                    fetchedData.expiration = new Date().getTime() + updateDelay - 5000;
                }
                if (localStorage) {
                    if (localStorage.getItem(storageName)) {
                        localStorage.removeItem(storageName);
                    }
                    localStorage.setItem(storageName, JSON.stringify(fetchedData));
                }
                try {
                    callBackMethod(fetchedData);
                } catch (e) {
                    throw e;
                }
            });
        } else {
            console.error(`${apiName} data could not be retrieved (response not OK): ${response}`);
        }
    }, (reason) => {
        console.error(`${apiName} data could not be retrieved: ${reason}`);
    });
}