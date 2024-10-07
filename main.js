const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,kaspa,tether&vs_currencies=usd&include_24hr_change=true';
const cryptoList = document.getElementById('crypto-list');
const cryptoSymbols = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'solana': 'SOL',
    'kaspa': 'KAS',
    'tether': 'TNT'
};

function updateCryptoPrices() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            for (const [crypto, info] of Object.entries(data)) {
                const price = info.usd;
                const change = info.usd_24h_change;
                const changeFormatted = change.toFixed(2);
                const isPositive = change >= 0;
                
                const cryptoItem = document.querySelector(`.crypto-item:has(.crypto-name:contains("${cryptoSymbols[crypto]}"))`);
                if (cryptoItem) {
                    cryptoItem.querySelector('.crypto-name').textContent = cryptoSymbols[crypto];
                    cryptoItem.querySelector('.crypto-price').textContent = `${price.toFixed(2)}K`;
                    const changeElement = cryptoItem.querySelector('.crypto-change');
                    changeElement.classList.toggle('positive', isPositive);
                    changeElement.classList.toggle('negative', !isPositive);
                    changeElement.querySelector('.crypto-change-percent').textContent = `(${isPositive ? '+' : ''}${changeFormatted}%)`;
                    changeElement.querySelector('.crypto-change-arrow').textContent = isPositive ? '▲' : '▼';
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

updateCryptoPrices();
setInterval(updateCryptoPrices, 60000); // Update every minute
