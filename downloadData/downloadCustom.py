from forex_data import download_forex, download_from_tradingview

print('''
Welcome to MentFX_Backtest. Here you can download the forrex pair data.

Forex pairs available for download are:
AUDCAD, AUDCHF, AUDJPY, AUDNZD, CADCHF, EURAUD, EURCHF, EURGBP,
EURJPY, EURUSD, GBPCHF, GBPJPY, GBPNZD, GBPUSD, GBPCHF, GBPJPY,
GBPNZD, NZDCAD, NZDCHF, NZDJPY, NZDUSD, USDCAD, USDCHF, USDJPY
''')

print('''
Select option to download forex pair:
1. Download all forex pairs.
2. Download all USDXXX pairs.
3. Download all EURXXX pairs.
4. Download all GBPXXX pairs.
5. Download forex pairs by providing forex pairs.
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

valid_options = ['1', '2', '3', '4', '5']
option = ''

while not option in valid_options:
    option = input('Enter your option.\n')
    if not option in valid_options:
        print('Incorrect option entered. Please enter a valid option.')
option = int(option)


switcher = {
    1: all_pairs,
    2: usd_pairs,
    3: eur_pairs,
    4: gbp_pairs,
}

ticker = switcher.get(int(option), [])

if option == 5:
    print('Select which pairs you want to download')
    for pair in all_pairs:
        yn = ''
        while True:
            yn = input(pair + ' (y/n) ')
            if yn == 'y' or yn == 'n':
                break
        if yn == 'y':
            ticker.append(pair)


def is_number(inputString):
    return all(char.isdigit() for char in inputString)


starting_year = 2020
while True:
    option = input(
        'Enter the start year from where you want to download the forex data.\n')
    if is_number(option):
        starting_year = int(option)
        break

# download_from_tradingview('EURUSD')
download_forex(ticker, starting_year)
