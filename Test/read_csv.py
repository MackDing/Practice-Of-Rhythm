import pandas as pd


def print_unique_projects(filename):
    exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                        'LT-converter', 'LT-model', 'LT-utility']
    exclude_projects = [project.lower() for project in exclude_projects]
    category_dict = {
        'Back End': ['parameter-service-legacy-cloud', 'psi-service', 'wqs-service', 'aims-service', 'external-service'],
        'Front End': ['aca', 'parameter-web', 'psi-web', 'Public-API', 'back-office', 'aims-web'],
        'EKS services': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud']
    }
    category_dict = {category: [project.lower() for project in projects]
                     for category, projects in category_dict.items()}

    # 读取CSV文件
    df = pd.read_csv(filename)

    # 存储所有的项目
    all_projects = []

    # 循环遍历所有的列
    for column in df.columns:
        # 检查当前列名是否包含 "Affects Project"
        if 'Affects Project' in column:
            # 去除重复的项目并添加到all_projects列表中
            unique_projects = df[column].dropna().unique()
            unique_projects = [project.lower() for project in unique_projects]
            all_projects.extend(unique_projects)

    # 去除重复
    all_projects = list(set(all_projects))
    # 移除被排除的项目
    all_projects = [
        project for project in all_projects if project not in exclude_projects]

    # 打印到控制台，每行展示一个
    # # 按照类别打印项目
    for category, projects in category_dict.items():
        print(f'\n{category}' + ':')
        for project in projects:
            if project in all_projects:
                print(project)

    print('\nOther projects:')
    for project in all_projects:
        if not any(project in projects for projects in category_dict.values()):
            print(project)


# print_unique_projects(r'D:\QIMA\Github\practice-of-Rhythm\Test\QIMA.csv')
print_unique_projects(r"D:\QIMA\Github\practice-of-Rhythm\Test\QIMA.csv")
