import jenkins
import time

url = 'https://jenkins.qima.com/'
Jenkins_UserID = '57107d89-ac0c-432b-8b16-2f74cb731bf4'
api_token = '11fa676fbce6a19f41cffd352f1b5252ee'
job_name = 'PP/pp-psi-web'
branch_name = 'SP-16190'

server = jenkins.Jenkins(url, username=Jenkins_UserID, password=api_token)
print(server.get_job_info(job_name))
print('*'*88)
print(server.get_job_info(job_name)['nextBuildNumber'])
next_build_number = server.get_job_info(job_name)['nextBuildNumber']

# 使用参数构建任务
server.build_job(job_name, {'BRANCH': branch_name})

# 等待一段时间(5s)，让服务器有时间更新job的状态
time.sleep(5)

# 再次获取job信息进行比较
if server.get_job_info(job_name)['nextBuildANumber'] == next_build_number + 1:
    print("Job is triggered")
else:
    print("Job is not triggered")
