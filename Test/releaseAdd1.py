import requests
import pandas as pd

# 设定API URL
# replace `workbook_id` and `worksheet_id` with your specific IDs
api_url = 'https://graph.microsoft.com/v1.0/me/drive/items/{workbook_id}/workbook/worksheets/{worksheet_id}/UsedRange'

# 设定header信息，包含你的访问令牌
headers = {
    'Authorization': 'Bearer your_token_here',
}

# 向API发送GET请求
response = requests.get(api_url, headers=headers)

# 将返回的JSON数据转换为Python字典
data = response.json()

# 将字典转换为DataFrame
df = pd.DataFrame(data['values'])

# 打印DataFrame
print(df)