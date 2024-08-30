# main.py
from requests.auth import HTTPBasicAuth
import requests
import sys
from PySide6.QtWidgets import QApplication, QMainWindow
from getJiraRelease_ui import Ui_Form  # Import the generated UI class

# 深色主题样式表
DARK_THEME_STYLESHEET = """
QMainWindow {
    background-color: #2b2b2b;
    color: #d3d3d3;
}

QWidget {
    background-color: #2b2b2b;
    color: #d3d3d3;
}

QPushButton {
    background-color: #3c3f41;
    color: #d3d3d3;
    border: 1px solid #565656;
    border-radius: 3px;
    padding: 5px;
}

QPushButton:hover {
    background-color: #45494a;
}

QPushButton:pressed {
    background-color: #292c2e;
}

QLabel, QLineEdit {
    color: #d3d3d3;
}

QTextEdit {
    background-color: #3c3f41;
    color: #d3d3d3;
    border: 1px solid #565656;
}

QLineEdit {
    background-color: #3c3f41;
    color: #d3d3d3;
    border: 1px solid #565656;
    border-radius: 3px;
    padding: 2px;
}
"""

# 原有的逻辑代码

category_dict = {
    'Commons': ['commons'],
    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],
    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'public-api', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service', 'iptb-web', 'b2b_dt_service'],
    'EKS': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud', 'report-service-cloud', 'ordercore-service-cloud', 'file-service-cloud', 'payment-service-cloud', 'mail-service-cloud', 'document-generation-service-cloud']
}
exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                    'LT-converter', 'LT-model', 'LT-utility']
exclude_projects = [project.lower() for project in exclude_projects]


def get_jira_issues(jira_url, username, api_token, jql, fields, max_results=300):
    query = {
        "jql": jql,
        "maxResults": max_results,
        "fields": fields
    }

    auth = HTTPBasicAuth(username, api_token)
    response = requests.get(jira_url, auth=auth, params=query)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve issues: {response.status_code}")
        print(response.text)
        return None


def extract_and_filter_affects_projects(data):
    filtered_values = {}

    for issue in data['issues']:
        fields = issue['fields']
        affects_projects = fields.get('customfield_12605', [])

        filtered_projects = [
            project for project in affects_projects if project["value"] not in ("None", "")
        ]
        if filtered_projects:
            filtered_values[issue['key']] = filtered_projects

    return filtered_values


def convert_to_value_dict(data):
    value_dict = {}
    for issue_key, projects in data.items():
        value_dict[issue_key] = [project['value'] for project in projects]
    return value_dict


def extract_unique_values(data_dict):
    all_values = set()
    for values in data_dict.values():
        all_values.update(value.lower() for value in values)
    unique_values_list = list(all_values)
    unique_values_list.sort()
    return unique_values_list


def categorize_unique_values(unique_values_list, category_dict):
    categorized_projects = {category: [] for category in category_dict}
    for value in unique_values_list:
        categorized = False
        for category, projects in category_dict.items():
            if value in projects:
                categorized_projects[category].append(value)
                categorized = True
                break
        if not categorized:
            categorized_projects.setdefault('Other Services', []).append(value)
    return categorized_projects


def format_projects_by_category(categorized_projects):
    try:
        result = ""
        for category, subprojects in categorized_projects.items():
            result += f"\n{category}:\n"
            if subprojects:
                for project in sorted(subprojects):
                    result += f"{project}\n"
            else:
                result += "Null\n"
        return result
    except Exception as e:
        print(f"Error in formatting projects: {str(e)}")
        raise


class MainWindow(QMainWindow, Ui_Form):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.setupUi(self)
        # Connect button click to run_main
        self.pushButton.clicked.connect(self.run_main)
        self.setWindowTitle("QIMA_Release v2.0")

    def run_main(self):
        jira_url = "https://qima.atlassian.net/rest/api/2/search"
        username = "mack.ding@qima.com"
        api_token = ""

        jql = (
            'project = SP AND issuetype in (standardIssueTypes(), subTaskIssueTypes()) '
            'AND status in (Done, "PM Review") AND resolution = "Waiting to Release" '
            'AND updated >= -60d ORDER BY cf[12628] ASC, Key ASC'
        )

        fields = ["key", "customfield_12605"]
        maxResults = 100

        data = get_jira_issues(
            jira_url, username, api_token, jql, fields, maxResults)

        if data:
            filtered_values = extract_and_filter_affects_projects(data)
            value_dict = convert_to_value_dict(filtered_values)
            unique_values_list = extract_unique_values(value_dict)
            categorized_projects = categorize_unique_values(
                unique_values_list, category_dict)
            results = format_projects_by_category(categorized_projects)
            # Output result to textEdit_2
            self.textEdit_2.setPlainText(results)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyleSheet(DARK_THEME_STYLESHEET)  # Set the dark theme stylesheet
    main_win = MainWindow()
    main_win.show()
    sys.exit(app.exec())

# pyinstaller -w --name QIMA_Release_gui_v2.0 --onefile main.py