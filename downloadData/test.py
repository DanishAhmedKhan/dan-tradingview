import yfinance as yf

# Nasdaq 100 (US100)
us100_data = yf.download("^NDX", start="2024-11-01",
                         end="2024-11-06", interval="1m")

aapl = yf.Ticker("aapl")
# us100_data = aapl.history(start="2024-11-01", end="2024-11-06", interval="1m")

print(us100_data)
