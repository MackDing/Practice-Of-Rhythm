import requests
from requests.auth import HTTPBasicAuth
import json
from dotenv import load_dotenv
import os

# 加载 .env 文件中的环境变量
load_dotenv()

exclude_projects = ['LT-DAO', 'LT-DTO', 'LT-constant',
                    'LT-converter', 'LT-model', 'LT-utility']
exclude_projects = [project.lower() for project in exclude_projects]


category_dict = {
    'Commons': ['commons'],
    'Back End': ['psi-service', 'wqs-service', 'aims-service', 'external-service', 'data-service', 'document-service', 'irp-service', 'reports-service', 'customer-service', 'final-report-service', 'file-service', 'iptb-service'],
    'Front End': ['aca', 'parameter-web', 'irp-web', 'psi-web', 'public-api', 'back-office', 'aims-web', 'program-web', 'exchange-console', 'backoffice-portal-web', 'checklist-web', 'gi-web', 'auditor-app', 'cia-new', 'B2b-service', 'iptb-web', 'b2b_dt_service'],
    'EKS': ['claim', 'claim-cloud', 'aca-new', 'parameter-service-legacy-cloud', 'lt-external-service-cloud', 'ai-service-cloud', 'e-signature-service-cloud', 'exchange-service-cloud', 'exchange-worker-service-cloud', 'finance-service-cloud', 'report-service-cloud', 'ordercore-service-cloud', 'file-service-cloud', 'payment-service-cloud', 'mail-service-cloud', 'document-generation-service-cloud', 'document-verification-service-cloud', 'exchange-console-cloud', 'search-center-service-cloud','price-service-cloud','dynamic-order-service-cloud']
}


def get_jira_issues(jira_url, username, api_token, jql, fields, max_results=300):
    query = {
        "jql": jql,
        "maxResults": max_results,
        "fields": fields
    }

    auth = HTTPBasicAuth(username, api_token)
    try:
        print("Sending request to Jira API...")
        response = requests.get(jira_url, auth=auth, params=query)
        # print(f"Response status code: {response.status_code}")
        # print(f"Response headers: {response.headers}")

        response.raise_for_status()  # This will raise an exception for HTTP errors

        json_response = response.json()
        # print(f"Successfully retrieved {len(json_response.get('issues', []))} issues")
        return json_response
    except requests.exceptions.RequestException as e:
        print(f"Error occurred while making the request: {e}")
        if hasattr(e, 'response'):
            print(f"Response status code: {e.response.status_code}")
            print(f"Response text: {e.response.text}")
        else:
            print("No response object available")
        return None


def extract_and_filter_affects_projects(data):
    filtered_values = {}

    for issue in data['issues']:
        fields = issue['fields']
        affects_projects = fields.get('customfield_12605', [])

        # Handle cases where affects_projects is None
        if affects_projects is None:
            affects_projects = []

        # 过滤掉'None'和空值
        filtered_projects = [
            project for project in affects_projects if project.get("value") not in ("None", "")
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
        # 将每个值转换为小写后更新到集合中
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


def main():
    try:
        jira_url = "https://qima.atlassian.net/rest/api/2/search"

        username = os.getenv("JIRA_USERNAME")
        api_token = os.getenv("JIRA_API_TOKEN")

        # JQL Search
        jql = (
            'project = SP AND issuetype in (standardIssueTypes(), subTaskIssueTypes()) '
            'AND status in (Done, "PM Review") AND resolution = "Waiting to Release" '
            'AND updated >= -60d ORDER BY cf[12628] ASC, Key ASC'
        )

        fields = ["key", "customfield_12605"]
        maxResults = 100

        data = get_jira_issues(jira_url, username, api_token,
                               jql, fields, maxResults)

        if data:
            print("\nExtracting and filtering affects projects...")
            filtered_values = extract_and_filter_affects_projects(data)
            value_dict = convert_to_value_dict(filtered_values)
            unique_values_list = extract_unique_values(value_dict)
            categorized_projects = categorize_unique_values(
                unique_values_list, category_dict)
            results = format_projects_by_category(categorized_projects)

            print("\nFinal Results:")
            print(results)

            if not results.strip():
                raise ValueError(
                    "No results were generated after processing the data.")
        else:
            raise ValueError(
                "Failed to retrieve data from Jira. Please check your credentials and network connection.")

    except Exception as e:
        error_message = f"An error occurred while processing the Jira data: {str(e)}"
        print(f"\nError: {error_message}")
        # 如果需要，你可以在这里添加更多的错误处理逻辑，比如记录日志或发送通知
        raise  # 重新抛出异常，以便调用者可以捕获它


if __name__ == "__main__":
    main()
