import os

filename = '2025-10.csv'
relative_path = os.path.join('..', 'data', 'GER40', 'H', filename)
absolute_path = os.path.abspath(relative_path)

print("Looking for file at:", absolute_path)
print("File exists:", os.path.exists(absolute_path))
