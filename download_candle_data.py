import os
import datetime
from pathlib import Path
import pandas as pd

url = 'https://candledata.fxcorporate.com/'
url_suffix = '.csv.gz'
storage_options = {'User-Agent': 'Mozilla/5.0'}

tickers = ['EURUSD', 'GBPUSD']
# AUDCAD,AUDCHF,AUDJPY, AUDNZD,CADCHF,EURAUD,EURCHF,EURGBP
# EURJPY,EURUSD,GBPCHF,GBPJPY,GBPNZD,GBPUSD,GBPCHF,GBPJPY
# GBPNZD,NZDCAD,NZDCHF.NZDJPY,NZDUSD,USDCAD,USDCHF,USDJPY

current_date = datetime.date.today()
year, week_num, day_of_week = current_date.isocalendar()
week_num = week_num - 1
start_year = 2020

valid_filename = []


def format_date(datetime):
    date = datetime[0:11]
    time = datetime[11:]
    m = date[0:2]
    d = date[3:5]
    y = date[6:10]
    return y + '-' + m + '-' + d + ' ' + time


def save_data(tempdata, type, ticker, year, week):
    tempdata.drop(['AskOpen', 'AskHigh', 'AskLow',
                  'AskClose'], axis=1, inplace=True)
    tempdata['DateTime'] = tempdata['DateTime'].apply(format_date)

    outname = str(year) + '-' + str(week) + '.csv'
    outdir = Path('./data/' + ticker + '/' + type)
    fullname = os.path.join(outdir, outname)

    if not os.path.isfile(fullname):
        outdir.mkdir(parents=True, exist_ok=True)
        tempdata.to_csv(fullname, header=False, index=False)


def is_file_present(ticker, time, year, week):
    filepath = './data/' + ticker + '/' + time + '/' + year + '-' + week + '.csv'
    print(filepath)
    return os.path.isfile(filepath)


def download_data(ticker, year, week):
    year = str(year)
    week = str(week)

    suffix = ticker + '/' + year + '/' + week + url_suffix
    url_path_m = url + 'm1/' + suffix
    url_path_h = url + 'H1/' + suffix

    try:
        if not is_file_present(ticker, 'M', year, week):
            tempdata = pd.read_csv(
                url_path_m, compression='gzip', storage_options=storage_options)
            save_data(tempdata, 'M', ticker, year, week)

        if not is_file_present(ticker, 'H', year, week):
            tempdata = pd.read_csv(
                url_path_h, compression='gzip', storage_options=storage_options)
            save_data(tempdata, 'H', ticker, year, week)

        filename = str(year) + '-' + str(week)
        valid_filename.append(filename)
    except:
        print('error')


def save_valid_filenames(ticker):
    outdir = Path('./data/' + ticker)
    outdir.mkdir(parents=True, exist_ok=True)
    fullname = os.path.join(outdir, 'dates.csv')
    pd.DataFrame(valid_filename).to_csv(fullname, header=False, index=False)


for tk in tickers:
    for y in range(start_year, year + 1):
        for w in range(1, 54):
            if not (y == year and w > week_num):
                download_data(tk, y, w)
    save_valid_filenames(tk)
