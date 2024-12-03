from datetime import datetime


def is_forex_pair(symbol):
    symbol = symbol.upper()

    forex_pairs = [
        'AUDCAD', 'AUDCHF', 'AUDJPY', 'AUDNZD', 'CADCHF', 'EURAUD', 'EURCHF', 'EURGBP',
        'EURJPY', 'EURUSD', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'GBPCHF', 'GBPJPY',
        'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY'
    ]

    return symbol in forex_pairs


def check_year(year):
    current_year = datetime.now().year

    try:
        year = int(year)

        return year <= current_year and (current_year - year) <= 10

    except ValueError:
        print("Invalid input. Please enter a valid year.")
