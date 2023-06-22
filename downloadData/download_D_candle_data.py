import os
from tvdatafeed import TvDatafeed, Interval

ticker = 'GBPUSD'
tv = TvDatafeed()
df = tv.get_hist(symbol=ticker, exchange="FX",
                 interval=Interval.in_daily, n_bars=1000)
# df = tv.get_hist(symbol="BTCUSDT", exchange="BINANCE", interval=Interval.in_daily, n_bars=100);
print(df)

df = df.drop('symbol', axis=1)

cwd = os.getcwd()
path = cwd + "/" + ticker
df.to_csv(path)
