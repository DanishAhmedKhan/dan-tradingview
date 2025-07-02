# sanitizes data with provided filenames

from datetime import datetime
import csv
import os

current_directory = os.getcwd()
print("current directory", current_directory)


filenames = ['2025-10', '2025-11', '2025-12',
             '2025-13', '2025-14', '2025-15', '2025-16', '2025-17', '2025-18', '2025-19', '2025-20']

# Get the absolute path to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Build the path to the CSV directory
data_dir = os.path.join(script_dir, '..', 'data', 'GER40', 'M')

for name in filenames:
    name = name + '.csv'
    filepath = os.path.join(data_dir, name)
    temp_filepath = os.path.join(data_dir, f'temp_{name}')

    with open(filepath, 'r', newline='') as infile, open(temp_filepath, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        next(reader, None)

        for row in reader:
            if not row:
                continue
            datetime_str = row[0].split(' GMT')[0]
            dt = datetime.strptime(datetime_str, "%d.%m.%Y %H:%M:%S.%f")
            formatted_datetime = dt.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
            new_row = [formatted_datetime] + row[1:5]

            writer.writerow(new_row)

    os.replace(temp_filepath, filepath)
