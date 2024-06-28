import pandas as pd

# 读取Excel文件
df = pd.read_excel('./QIMA (4).csv')

# 获取所有“Custom field (Affects Project)”列（假设列名完全相同）
affects_project_columns = [col for col in df.columns if col == "Custom field (Affects Project)"]

# 创建一个空的集合来存储所有不同的Affects Project name
unique_projects = set()

# 遍历每一列，添加Affects Project name到集合中
for col in affects_project_columns:
    unique_projects.update(df[col].dropna().unique())

# 去除‘None’，‘LT-DTO’
unique_projects.discard('None')
unique_projects.discard('LT-DTO')

# 创建一个列表保存并打印结果
sorted_projects = sorted(unique_projects)
for project in sorted_projects:
    print(project)

# 如果需要保存结果到新的文件，比如 txt
# with open("unique_projects.txt", "w") as output_file:
#     for project in sorted_projects:
#         output_file.write(f"{project}\n")