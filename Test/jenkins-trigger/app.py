from flask import Flask, request, render_template
import jenkins
import time


app = Flask(__name__)

url = 'https://jenkins.qima.com/'
Jenkins_UserID = '57107d89-ac0c-432b-8b16-2f74cb731bf4'
api_token = '11fa676fbce6a19f41cffd352f1b5252ee'

# 环境变量
env = 'PP'

server = jenkins.Jenkins(url, username=Jenkins_UserID, password=api_token)


@app.route('/', methods=['GET', 'POST'])
def trigger_job():
    results = []

    if request.method == 'POST':
        job_branch_pairs = request.form['job_branch_pairs']
        for pair in job_branch_pairs.split(', '):
            job_name, branch_name = pair.split(':')
            job_name = env + '/' + job_name

            next_build_number = server.get_job_info(
                job_name)['nextBuildNumber']
            server.build_job(job_name, {'BRANCH': branch_name})

            time.sleep(5)

            if server.get_job_info(job_name)['nextBuildNumber'] == next_build_number + 1:
                results.append(f"Job: {job_name} with branch: {
                               branch_name} is triggered.")
            else:
                results.append(f"Job: {job_name} with branch: {
                               branch_name} is not triggered.")

    return render_template('index.html', results=results)


if __name__ == '__main__':
    app.run(debug=True)
