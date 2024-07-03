from office365.sharepoint.client_context import ClientContext
from office365.runtime.auth.client_credential import ClientCredential
import pandas as pd
import io

# SharePoint site and file URL
# https://ainsp.sharepoint.com/:x:/r/sites/ITTeam/_layouts/15/doc2.aspx?sourcedoc=%7BE80D243A-93D4-42F8-AB62-31EB5E0D89F3%7D&file=Release-Management%20-%202023.xlsx&action=default&mobileredirect=true&cid=437f4a1d-53ba-4ee7-a941-039f66bc5a51&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMzAxMTEwNTYwMCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1701246321650&web=1
sharepoint_site = 'https://ainsp.sharepoint.com/:x:/r/sites/ITTeam/_layouts/15/doc2.aspx?sourcedoc=%7BE80D243A-93D4-42F8-AB62-31EB5E0D89F3%7D&file=Release-Management%20-%202023.xlsx&action=default&mobileredirect=true&cid=437f4a1d-53ba-4ee7-a941-039f66bc5a51&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMzAxMTEwNTYwMCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1701246321650&web=1'
relative_url = '/sites/ITTeam/Shared Documents/2024/Release-Management -2023.xlsx'
client_id = 'your_client_id'
client_secret = 'your_client_secret'

# Authenticate and create a SharePoint client context
ctx = ClientContext(sharepoint_site).with_credentials(
    ClientCredential(client_id, client_secret))

# Load the file content
response = ctx.web.get_file_by_server_relative_url(relative_url).download()
content = io.BytesIO(response.content)
df = pd.read_excel(content)

# 输出读取的内容 to 使用
print(df.head())
