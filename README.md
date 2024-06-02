# Day_3_Crypto
# Crypto Price Tracker
It is a web application that displays current cryptocurrency prices and allows users to simulate potential investment outcomes. This application fetches real-time data from the CoinGecko API and provides an interactive user experience with a neat and responsive design.

# Features
 Display current prices of major cryptocurrencies.
 Show 24-hour price change for each cryptocurrency.
 Investment simulation to predict profit or loss based on historical price data.
 Advice on whether to purchase a cryptocurrency based on its 30-day average price.
 Responsive design with a background image and animations.

# Technologies Used
HTML
CSS
JavaScript
CoinGecko API

# API References
Current Prices API

URL: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true
Fetches current prices and 24-hour changes for specified cryptocurrencies.

# What are SMAs?
Simple Moving Averages (SMAs): SMAs are widely used technical indicators in finance and investment analysis. They smooth out price data to identify trends and potential reversal points. A Simple Moving Average is calculated by summing up a set of prices over a specific time period (e.g., 30 days) and then dividing by the number of periods. It provides a clearer picture of the underlying price trend by filtering out short-term fluctuations. In this context, the code calculates the SMA based on the historical price data of a cryptocurrency over the past 30 days to assist users in making investment decisions.
