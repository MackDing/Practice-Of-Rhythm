import requests

# 用户名
username = 'MackDing'

# 查询GitHub API URL
url = f'https://api.github.com/users/{username}/repos'
# print(url)
# 发送请求获取仓库信息
response = requests.get(url)
repositories = response.json()

# 存放启用 GitHub Pages 的仓库及其 URL
github_pages_repos = []

# 遍历仓库列表
for repo in repositories:
    if repo.get('has_pages'):
        pages_url = f"https://{username}.github.io/{repo['name']}/" if repo['name'] != f"{username}.github.io" else f"https://{username}.github.io/"
        github_pages_repos.append({
            'name': repo['name'],
            'url': pages_url
        })

# 打印启用了 GitHub Pages 的仓库信息
for repo in github_pages_repos:
    print(f"Repository: {repo['name']}\nGitHub Pages URL: {repo['url']}\n")