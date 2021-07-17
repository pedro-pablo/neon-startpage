const IPIFY_UPDATE_DELAY_MS = 600000;
const IPIFY_API_URL = 'https://api64.ipify.org?format=json';

const IP_ADDRESS_ELEMENT = document.getElementById('info-ip-addr');

function updateIpDisplay(data) {
    IP_ADDRESS_ELEMENT.innerText = data.ip;
}

function updateIp() {
    updateApi('IPIFY', IPIFY_API_URL, 'ipify', IPIFY_UPDATE_DELAY_MS, updateIpDisplay);
}