from util import *
import requests
from forex_data import download_forex, download_from_tradingview

print('''
Welcome to MENT_DOWNLOAD

Forex pairs available for download:
AUDCAD, AUDCHF, AUDJPY, AUDNZD, CADCHF, EURAUD, EURCHF, EURGBP,
EURJPY, EURUSD, GBPCHF, GBPJPY, GBPNZD, GBPUSD, GBPCHF, GBPJPY,
GBPNZD, NZDCAD, NZDCHF, NZDJPY, NZDUSD, USDCAD, USDCHF, USDJPY
''')

all_pairs = [
    'AUDCAD', 'AUDCHF', 'AUDJPY', 'AUDNZD', 'CADCHF', 'EURAUD', 'EURCHF', 'EURGBP',
    'EURJPY', 'EURUSD', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'GBPCHF', 'GBPJPY',
    'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY',
]

usd_pairs = [
    'EURUSD', 'GBPUSD', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY',
]

eur_pairs = [
    'EURAUD', 'EURCHF', 'EURGBP', 'EURJPY', 'EURUSD',
]

gbp_pairs = [
    'EURGBP', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'GBPCHF', 'GBPJPY', 'GBPNZD',
]

default_symbol = 'EURUSD'
default_year = '2020'

symbol = input('Enter symbol: ')
year = input('Enter year: ')

if not symbol.strip():
    symbol = default_symbol

if not year.strip():
    year = default_year


if is_forex_pair(symbol):
    download_forex(symbol, year)
else:
    stock_api = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NVDA&interval=1min&apikey=K120VDWLMUBPS9OR'

    try:
        response = requests.get()
        response.raise_for_status()
        data = response.json()
        stock_data = data.get('result', [])

        with open(csv_filename, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['t', 'o', 'h', 'l', 'c'])

            for item in stock_data:
                t = item.get('t')
                o = item.get('o')
                h = item.get('h')
                l = item.get('l')
                c = item.get('c')

                writer.writerow([t, o, h, l, c])
    except:
        print('ERROR!')
