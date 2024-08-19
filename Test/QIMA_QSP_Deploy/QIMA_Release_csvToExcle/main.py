import sys
import pandas as pd
import json
from PySide6.QtWidgets import QApplication, QDialog, QFileDialog, QMessageBox
from ui_dialog import Ui_Form
import PySide6.QtCore
import os

# 设置QT_QPA_PLATFORM_PLUGIN_PATH
plugin_path = os.path.join(os.path.dirname(
    PySide6.QtCore.__file__), 'plugins', 'platforms')
os.environ['QT_QPA_PLATFORM_PLUGIN_PATH'] = plugin_path

print(f"PLUGIN_PATH: {plugin_path}")

# Excluded projects and category definition
exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                    'LT-converter', 'LT-model', 'LT-utility']
exclude_projects = [project.lower() for project in exclude_projects]

category_dict = {
    'Commons': ['commons'],
    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],
    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'Public-API', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service', 'iptb-web'],
    'EKS services': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud', 'report-service-cloud', 'ordercore-service-cloud', 'file-service-cloud', 'payment-service-cloud']
}
category_dict = {category: [project.lower() for project in projects]
                 for category, projects in category_dict.items()}


def get_unique_projects(filename):
    try:
        df = pd.read_csv(filename)
        print(f"DataFrame loaded: {df.shape}")
    except Exception as e:
        print(f"Error reading CSV file: {str(e)}")
        raise
    all_projects = []

    for column in df.columns:
        if 'Affects Project' in column:
            unique_projects = df[column].dropna().unique()
            unique_projects = [project.lower() for project in unique_projects]
            all_projects.extend(unique_projects)

    all_projects = set(all_projects)
    filtered_projects = [
        project for project in all_projects if project not in exclude_projects]

    categorized_projects = {'Commons': [], 'QSP': {
        'Back End': [], 'Front End': []}, 'EKS': [], 'Other Services': []}

    for category, projects in category_dict.items():
        for project in projects:
            if project in filtered_projects:
                if category == 'Commons':
                    categorized_projects['Commons'].append(project)
                elif category in ('Back End', 'Front End'):
                    categorized_projects['QSP'][category].append(project)
                elif category == 'EKS services':
                    categorized_projects['EKS'].append(project)

    for project in filtered_projects:
        if (project not in categorized_projects['Commons'] and
            project not in categorized_projects['QSP']['Back End'] and
            project not in categorized_projects['QSP']['Front End'] and
                project not in categorized_projects['EKS']):
            categorized_projects['Other Services'].append(project)

    print(f"Categorized projects: {categorized_projects}")
    return categorized_projects


def format_projects_by_category(categorized_projects):
    try:
        result = ""
        for category, subprojects in categorized_projects.items():
            if isinstance(subprojects, dict):  # For QSP
                result += f'\n{category} (QSP):\n'
                for subcategory, projects in subprojects.items():
                    result += f'{subcategory}:\n'
                    if projects:
                        for project in projects:
                            result += f'{project}\n'
                    else:
                        result += 'Null\n'
            else:
                result += f'\n{category}:\n'
                if subprojects:
                    for project in subprojects:
                        result += f'{project}\n'
                else:
                    result += 'Null\n'

        print(f"Formatted result: {result[:1000]}...")
        return result
    except Exception as e:
        print(f"Error in formatting projects: {str(e)}")
        raise


class MyApp(QDialog):
    def __init__(self):
        super().__init__()
        # self.ui = Ui_Dialog()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        self.setWindowTitle("QIMA_Release v1.0")

        self.ui.pushButton.clicked.connect(self.load_csv)
        self.ui.pushButton_2.clicked.connect(self.safe_execute)
        self.ui.pushButton_3.clicked.connect(self.safe_clear_text)

    def load_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, 'Open CSV file', '', 'CSV files (*.csv)')
        if file_path:
            self.ui.filePath.setText(file_path)
            print(f"File selected: {file_path}")

    def execute(self):
        print("Execute button clicked.")
        file_path = self.ui.filePath.text()  # 改为使用 text()
        if not file_path:
            self.ui.results.setText(
                "The file or file path is incorrect, please check")
            QMessageBox.warning(
                self, "Warning", "The file or file path is incorrect, please check")
            return

        try:
            categorized_projects = get_unique_projects(file_path)
            result = format_projects_by_category(categorized_projects)
            print("Result formatted successfully.")
            self.ui.results.setText(result)
        except pd.errors.EmptyDataError:
            self.ui.results.setText("The CSV file is empty.")
            print("The CSV file is empty.")
        except pd.errors.ParserError as e:
            self.ui.results.setText("Error parsing the CSV file.")
            print(f"ParserError: {e}")
        except FileNotFoundError:
            self.ui.results.setText(f"File not found: {file_path}")
            print(f"File not found: {file_path}")
        except Exception as e:
            self.ui.results.setText(
                f"Error processing the file: {str(e)}")
            print(f"Error processing the file: {str(e)}")

    def clear_text(self):
        self.ui.filePath.clear()
        self.ui.results.clear()

    def safe_execute(self):
        try:
            self.execute()
        except Exception as e:
            print(f"An error occurred during execution: {e}")
            self.ui.results.setText(f"An error occurred: {str(e)}")
            QMessageBox.critical(self, "Critical Error",
                                 f"An error occurred: {e}\nSee console for more details.")

    def safe_clear_text(self):
        try:
            self.clear_text()
        except Exception as e:
            print(f"An error occurred during clearing: {e}")
            QMessageBox.critical(self, "Critical Error",
                                 f"An error occurred: {e}\nSee console for more details.")


if __name__ == "__main__":
    try:
        app = QApplication(sys.argv)
        window = MyApp()
        window.show()
        sys.exit(app.exec())
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()
        QMessageBox.critical(
            None, "Critical Error", f"An error occurred: {e}\nSee console for more details.")

# pyside6-uic -o ui_dialog.py QIMA_Release.ui
#
# pyinstaller --onefile --windowed --exclude-module PyQt5 main.py
