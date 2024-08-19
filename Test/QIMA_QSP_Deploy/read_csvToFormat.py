import pandas as pd
import pprint


def get_unique_projects(filename):
    # Exclude projects to lower case
    exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                        'LT-converter', 'LT-model', 'LT-utility']
    exclude_projects = [project.lower() for project in exclude_projects]

    # Projects category, lower case
    category_dict = {
        'commons': ['commons'],
        'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'final-report-service'],
        'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'Public-API', 'back-office', 'aims-web', 'program-web', 'exchange-console'],
        'EKS services': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud']
    }
    category_dict = {category: [project.lower() for project in projects]
                     for category, projects in category_dict.items()}

    # Read CSV file
    df = pd.read_csv(filename)

    # Store all projects
    all_projects = []

    # Traverse all columns to find 'Affects Project' columns
    for column in df.columns:
        if 'Affects Project' in column:
            unique_projects = df[column].dropna().unique()
            unique_projects = [project.lower() for project in unique_projects]
            all_projects.extend(unique_projects)

    # Remove duplicates
    all_projects = list(set(all_projects))
    # Remove excluded projects
    all_projects = [
        project for project in all_projects if project not in exclude_projects]

    # Initialize categorized projects dict
    categorized_projects = {'commons': [], 'QSP': [], 'EKS': []}

    # Categorize projects
    for category, projects in category_dict.items():
        for project in projects:
            if project in all_projects:
                if category == 'commons':
                    categorized_projects['commons'].append(project)
                elif category == 'Back End' or category == 'Front End':
                    categorized_projects['QSP'].append(project)
                elif category == 'EKS services':
                    categorized_projects['EKS'].append(project)

    # Categorize other projects into 'EKS'
    for project in all_projects:
        if project not in categorized_projects['commons'] and project not in categorized_projects['QSP']:
            categorized_projects['EKS'].append(project)

    return categorized_projects


def print_project_list(categorized_projects):
    # pprint.pp(categorized_projects)
    print(categorized_projects)


# Replace with your actual CSV file path
categorized_projects = get_unique_projects(
    r"Test/QIMA_QSP_Deploy/QIMA (4).csv")
print_project_list(categorized_projects)
