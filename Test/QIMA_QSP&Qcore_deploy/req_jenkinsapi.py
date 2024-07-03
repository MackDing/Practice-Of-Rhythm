import jenkins
import time


def trigger_jenkins_job(url, user_id, api_token, job_name, branch_name, sleep_time=5):
    """
    触发Jenkins作业。

    :param url: Jenkins服务器的URL
    :param user_id: 用户ID（用户名）
    :param api_token: API令牌
    :param job_name: Jenkins作业的名称
    :param branch_name: 分支名称
    :param sleep_time: 等待时间，单位为秒，默认为5秒
    :return: 如果成功触发作业则返回True，否则返回False
    """
    try:
        server = jenkins.Jenkins(url, username=user_id, password=api_token)
        job_info = server.get_job_info(job_name)

        next_build_number = job_info['nextBuildNumber']

        print(server.get_job_info(job_name))
        print('*' * 88)
        print(next_build_number)

        # 使用参数构建任务
        server.build_job(job_name, {'BRANCH': branch_name})

        # 等待一段时间，让服务器有时间更新job的状态
        time.sleep(sleep_time)

        # 再次获取job信息进行比较，确保Job被触发
        updated_job_info = server.get_job_info(job_name)
        if updated_job_info['nextBuildNumber'] == next_build_number + 1:
            print("Job is triggered")
            return True
        else:
            print("Job is not triggered")
            return False
    except jenkins.JenkinsException as e:
        print(f"JenkinsException occurred: {e}")
        return False
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return False


# 使用封装函数
url = 'https://jenkins.qima.com/'
Jenkins_UserID = '57107d89-ac0c-432b-8b16-2f74cb731bf4'
api_token = '11fa676fbce6a19f41cffd352f1b5252ee'
job_name = 'PP/pp-psi-web'
branch_name = 'SP-16190'

is_triggered = trigger_jenkins_job(
    url, Jenkins_UserID, api_token, job_name, branch_name)
print(f"Job triggered: {is_triggered}")



# need verify job build success