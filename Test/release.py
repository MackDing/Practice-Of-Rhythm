import pandas as pd

df = pd.read_csv('./QIMA (1).csv')

affected_projects_columns = [col for col in df.columns if 'Affects Project' in col]
projects = set()

for col in affected_projects_columns:
    projects.update(df[col].dropna().str.split(' ', expand=True).values.flatten())

for project in sorted(projects):
    if project:
        print(project)