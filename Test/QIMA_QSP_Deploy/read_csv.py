import pandas as pd
import os
import json
import datetime
from datetime import datetime, timedelta

# Excluded projects in lower case
exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                    'LT-converter', 'LT-model', 'LT-utility']
exclude_projects = [project.lower() for project in exclude_projects]

# Projects category in lower case
category_dict = {
    'Commons': ['commons'],
    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],
    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'Public-API', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service', 'e-signature-web'],
    'EKS services': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud', 'e-signature', 'qrcode-cloud']
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
                            'Back End': [], 'Front End': [], 'EKS': [], 'Other projects': []}

    # Categorize projects
    for category, projects in category_dict.items():
        for project in projects:
            if project in filtered_projects:
                if category == 'Commons':
                    categorized_projects['Commons'].append(project)
                elif category == 'Back End':
                    categorized_projects['Back End'].append(project)
                elif category == 'Front End':
                    categorized_projects['Front End'].append(project)
                elif category == 'EKS services':
                    categorized_projects['EKS'].append(project)

    # Categorize other projects
    for project in filtered_projects:
        if (project not in categorized_projects['Commons'] and
                project not in categorized_projects['Back End'] and
                project not in categorized_projects['Front End'] and
                project not in categorized_projects['EKS']):
            categorized_projects['Other projects'].append(project)

    return categorized_projects


def read_num_value(filename='num_value.json'):
    """
    Read the Num value from a file. If the file does not exist, initialize with 0.
    """
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            data = json.load(file)
            return data.get('num', 0)
    return 0


def write_num_value(num, filename='num_value.json'):
    """
    Write the Num value to a file.
    """
    with open(filename, 'w') as file:
        json.dump({'num': num}, file)


def add_num_field_and_increment(data, num):

    data['Num'] = num

    # Increment the num value for next time

    return data


def print_json_projects(categorized_projects, num_filename):
    num = read_num_value(num_filename)

    categorized_projects = add_num_field_and_increment(
        categorized_projects, num)

    json_str = json.dumps(categorized_projects, indent=4)
    print(json_str)
    num += 1
    write_num_value(num, num_filename)

    return json_str


def print_projects_by_category(categorized_projects):
    """
    Print projects by category with distinction between Back End and Front End.
    """
    for category, projects in categorized_projects.items():
        print(f'\n{category}:')
        for project in projects:
            print(project)


def save_json_to_file(json_str, filename):
    # Print current working directory
    # print(f"Saving JSON to: {os.path.abspath(filename)}")
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(json_str)


csv_filepath = r"Test/QIMA_QSP_Deploy/QIMA (2).csv"
json_filepath = "Test/QIMA_QSP_Deploy/releaseServices.json"
num_filename = "Test/QIMA_QSP_Deploy/num_value.json"

# Replace with your actual CSV file path
categorized_projects = get_unique_projects(csv_filepath)

# Print JSON dictionary and get the JSON string
json_output = print_json_projects(categorized_projects, num_filename)

# Save JSON output to file
save_json_to_file(
    json_output, json_filepath)

# Print projects by category with distinction between Back End and Front End
# print_projects_by_category(categorized_projects)
