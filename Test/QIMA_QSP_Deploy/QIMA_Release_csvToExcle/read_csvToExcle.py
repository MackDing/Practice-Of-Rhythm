import pandas as pd
import json

# Excluded projects in lower case
exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                    'LT-converter', 'LT-model', 'LT-utility']
exclude_projects = [project.lower() for project in exclude_projects]

# Projects category in lower case
category_dict = {
    'Commons': ['commons'],
    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],
    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'Public-API', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service'],
    'EKS services': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud']
}
category_dict = {category: [project.lower() for project in projects]
                 for category, projects in category_dict.items()}


def get_unique_projects(filename):
    """
    Read unique projects from the CSV file that match the 'Affects Project' criteria.
    """
    df = pd.read_csv(filename)
    all_projects = []

    # Loop through all columns
    for column in df.columns:
        if 'Affects Project' in column:
            unique_projects = df[column].dropna().unique()
            unique_projects = [project.lower() for project in unique_projects]
            all_projects.extend(unique_projects)

    # Remove duplicates
    all_projects = list(set(all_projects))
    # Remove excluded projects
    filtered_projects = [
        project for project in all_projects if project not in exclude_projects]

    # Initialize categorized projects dict
    categorized_projects = {'Commons': [],
                            'QSP': {'Back End': [], 'Front End': []},
                            'EKS': [],
                            'Other Services': []}

    # Categorize projects
    for category, projects in category_dict.items():
        for project in projects:
            if project in filtered_projects:
                if category == 'Commons':
                    categorized_projects['Commons'].append(project)
                elif category == 'Back End' or category == 'Front End':
                    categorized_projects['QSP'][category].append(project)
                elif category == 'EKS services':
                    categorized_projects['EKS'].append(project)

    # Categorize other projects
    for project in filtered_projects:
        if (project not in categorized_projects['Commons'] and
                project not in categorized_projects['QSP']['Back End'] and
                project not in categorized_projects['QSP']['Front End'] and
                project not in categorized_projects['EKS']):
            categorized_projects['Other Services'].append(project)

    return categorized_projects


def print_json_projects(categorized_projects):
    """
    Print the categorized projects as a JSON dictionary.
    """
    print(json.dumps(categorized_projects, indent=4))


def print_projects_by_category(categorized_projects):
    """
    Print projects by category.
    """
    for category, subprojects in categorized_projects.items():
        if isinstance(subprojects, dict):  # For QSP
            print(f'\n{category} (QSP):')
            for subcategory, projects in subprojects.items():
                print(f'{subcategory}:')
                if projects:
                    for project in projects:
                        print(f'{project}')
                else:
                    print('Null')
        else:
            print(f'\n{category}:')
            if subprojects:
                for project in subprojects:
                    print(project)
            else:
                print('Null')


# Replace with your actual CSV file path
categorized_projects = get_unique_projects(
    r"Test/QIMA_QSP_Deploy/QIMA (4).csv")

# Print JSON dictionary
# print_json_projects(categorized_projects)

# Print projects by category
print_projects_by_category(categorized_projects)
