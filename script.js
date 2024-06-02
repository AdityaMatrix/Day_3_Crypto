document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true';
    const HISTORICAL_URL = 'https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=30';
    const container = document.querySelector('.container');
    const cryptoSelect = document.getElementById('crypto-select');
    const simulationForm = document.getElementById('simulation-form');
    const simulationResult = document.getElementById('simulation-result');

    let cryptoData = {};

    // Fetch current cryptocurrency prices
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            cryptoData = data; // Store fetched data in a global variable
            displayPrices(data);
            populateSelectOptions(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayPrices(data) {
        container.innerHTML = ''; // Clear previous data if any
        const coins = Object.getOwnPropertyNames(data);

        for (let coin of coins) {
            const coinInfo = data[coin];
            const price = coinInfo.usd;
            const change = coinInfo.usd_24h_change.toFixed(5);

            container.innerHTML += `
            <div class="coin ${change < 0 ? 'falling' : 'rising'}">
                <div class="coin-logo">
                    <img src="images/${coin}.png">
                </div>
                <div class="coin-name">
                    <h3>${coin}</h3>
                    <span>/USD</span>
                </div>
                <div class="coin-price">
                    <span class="price">$${price}</span>
                    <span class="change">${change}%</span>
                </div>        
            </div>
            `;
        }
    }

    function populateSelectOptions(data) {
        cryptoSelect.innerHTML = ''; // Clear previous options if any
        for (let crypto of Object.keys(data)) {
            const option = document.createElement('option');
            option.value = crypto;
            option.textContent = crypto.charAt(0).toUpperCase() + crypto.slice(1);
            cryptoSelect.appendChild(option);
        }
    }

    simulationForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
        const selectedCrypto = cryptoSelect.value;
        const currentPrice = cryptoData[selectedCrypto].usd;
        const estimatedValue = (investmentAmount / currentPrice).toFixed(8); // Amount of crypto bought

        // Debug: Log current price
        console.log(`Current Price of ${selectedCrypto}: $${currentPrice}`);

        // Fetch historical price data for the selected cryptocurrency
        fetch(HISTORICAL_URL.replace('{id}', selectedCrypto))
            .then(response => response.json())
            .then(historicalData => {
                const recommendation = getRecommendation(currentPrice, historicalData);
                simulationResult.innerHTML = `
                    <p>With $${investmentAmount}, you can buy approximately ${estimatedValue} ${selectedCrypto}.</p>
                    <p>Recommendation: ${recommendation}</p>
                `;
            })
            .catch(error => console.error('Error fetching historical data:', error));
    });

    function getRecommendation(currentPrice, historicalData) {
        const prices = historicalData.prices.map(price => price[1]); // Extract prices from historical data
        const sma = calculateSMA(prices, 30); // Calculate 30-day SMA

        // Debug: Log historical prices and SMA
        console.log(`Historical Prices for SMA Calculation: ${prices}`);
        console.log(`Calculated 30-day SMA: $${sma}`);

        if (currentPrice > sma) {
            return "The current price is above the 30-day average. It might not be the best time to buy.";
        } else {
            return "The current price is below the 30-day average. It could be a good buying opportunity.";
        }
    }

    function calculateSMA(prices, period) {
        const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0); // Sum of prices over the specified period
        return sum / period; // Average price over the specified period
    }
});

