from datetime import datetime
import csv
import os

current_directory = os.getcwd()
print(current_directory)

start_year = 2023
current_year = datetime.now().year

for year in range(start_year, current_year):
    for week in range(50, 51):
        file_name = str(year) + '-' + str(week) + '.csv'
        file_path = os.path.join(
            current_directory + '\data\GBPUSD\H', file_name)

        if (os.path.exists(file_path)):
            with open(file_path, 'r', newline='') as file:
                reader = csv.reader(file)
                rows = list(reader)

            print(rows)
            print('d')

            # if '-' not in rows[0][0]:
