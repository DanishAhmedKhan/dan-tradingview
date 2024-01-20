import os
import datetime
from pathlib import Path
import pandas as pd
from tvdatafeed import TvDatafeed, Interval

fxcm_base_url = 'https://candledata.fxcorporate.com/'
fxcm_data_url_suffix = '.csv.gz'
storage_options = {'User-Agent': 'Mozilla/5.0'}
tradingview = TvDatafeed()

tickers = ['USDJPY']
# AUDCAD,AUDCHF,AUDJPY, AUDNZD,CADCHF,EURAUD,EURCHF,EURGBP
# EURJPY,EURUSD,GBPCHF,GBPJPY,GBPNZD,GBPUSD,GBPCHF,GBPJPY
# GBPNZD,NZDCAD,NZDCHF.NZDJPY,NZDUSD,USDCAD,USDCHF,USDJPY

today_date = datetime.date.today()
year, week_num, day_of_week = today_date.isocalendar()
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


def format_date_2(datetime):
    print(datetime)
    return datetime


def save_data(tempdata, type, ticker, outname):
    outdir = Path('./data/' + ticker + '/' + type)
    fullname = os.path.join(outdir, outname)

    if type == 'D' or not os.path.isfile(fullname):
        outdir.mkdir(parents=True, exist_ok=True)
        print('sss')
        print(tempdata)
        tempdata.to_csv(fullname, header=False, index=False)


def save_data_MH(tempdata, type, ticker, year, week):
    tempdata.drop(['AskOpen', 'AskHigh', 'AskLow',
                  'AskClose'], axis=1, inplace=True)
    tempdata['DateTime'] = tempdata['DateTime'].apply(format_date)

    outname = str(year) + '-' + str(week) + '.csv'
    save_data(tempdata, type, ticker, outname)


def is_file_present(ticker, time, year, week):
    filepath = './data/' + ticker + '/' + time + '/' + year + '-' + week + '.csv'
    print(filepath)
    return os.path.isfile(filepath)


def download_data(ticker, year, week):
    year = str(year)
    week = str(week)

    suffix = ticker + '/' + year + '/' + week + fxcm_data_url_suffix
    url_path_m = fxcm_base_url + 'm1/' + suffix
    url_path_h = fxcm_base_url + 'H1/' + suffix

    try:
        if not is_file_present(ticker, 'M', year, week):
            tempdata = pd.read_csv(
                url_path_m, compression='gzip', storage_options=storage_options)
            save_data_MH(tempdata, 'M', ticker, year, week)

        if not is_file_present(ticker, 'H', year, week):
            tempdata = pd.read_csv(
                url_path_h, compression='gzip', storage_options=storage_options)
            save_data_MH(tempdata, 'H', ticker, year, week)

        filename = str(year) + '-' + str(week)
        valid_filename.append(filename)
    except:
        print('error')


def save_valid_filenames(ticker):
    print('valid')
    outdir = Path('./data')
    outdir.mkdir(parents=True, exist_ok=True)
    fullname = os.path.join(outdir, 'dates.csv')

    # if not os.path.isfile(fullname):
    pd.DataFrame(valid_filename).to_csv(
        fullname, header=False, index=False)


def download_from_fxcm(ticker):
    for y in range(start_year, year + 1):
        for w in range(1, 54):
            if not (y == year and w > week_num):
                download_data(ticker, y, w)

    save_valid_filenames(ticker)


def download_from_tradingview(ticker):
    df = tradingview.get_hist(symbol=ticker, exchange="FX",
                              interval=Interval.in_daily, n_bars=1000)
    df = df.drop('symbol', axis=1)
    df = df.reset_index(drop=False)
    print(df)
    df['datetime'] = df['datetime'].apply(format_date_2)
    save_data(df, 'D', ticker, 'ALL.csv')


def download_forex(tk, sy):
    global tickers
    global start_year
    tickers = tk
    start_year = sy

    for tk in tickers:
        # download_from_fxcm(tk)
        download_from_tradingview(tk)
