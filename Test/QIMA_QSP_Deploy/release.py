import json
from datetime import datetime, timedelta
import pytz

# 读取JSON文件


def read_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# 保存JSON文件


def save_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# 递增commons版本号


def increment_commons_version(version):
    prefix, snapshot = version.split('-')
    major, minor, patch = map(int, prefix.split('.'))

    patch += 1
    if patch > 999:
        patch = 0
        minor += 1
    if minor > 99:
        minor = 0
        major += 1

    return f"{major}.{minor:02d}.{patch:03d}-{snapshot}"

# 递增public-api版本号


def increment_public_api_version(version):
    parts = version.split('release-')[-1].split('.')
    major, minor, patch = map(int, parts)

    patch += 1
    if patch > 999:
        patch = 0
        minor += 1
    if minor > 99:
        minor = 0
        major += 1

    return f"release-{major}.{minor}.{patch}"

# 递增其他版本号


def increment_version(version):
    parts = version.split('release-')[-1].split('.')
    parts = [int(part) for part in parts]

    parts[-1] += 1

    for i in reversed(range(len(parts))):
        limit = 99 if i > 0 else 999

        if parts[i] > limit:
            parts[i] = 0
            if i > 0:
                parts[i-1] += 1
            else:
                raise ValueError("Version limit exceeded.")

    return f"release-{'.'.join(map(str, parts))}"

# 获取中国时区当前日期


def get_current_date():
    tz = pytz.timezone('Asia/Shanghai')
    return datetime.now(tz)

# 检查是否需要添加新版本条目


def should_add_new_entry(data, use_date_logic):
    if not use_date_logic:
        return True

    current_date = get_current_date().date()
    current_weekday = current_date.weekday()

    if current_weekday == 4:  # If today is Friday
        friday_this_week = current_date
        # print(f"Today is Friday, friday_this_week is: {friday_this_week}")
    elif current_weekday < 4:  # If today is Monday to Thursday
        friday_this_week = current_date + timedelta(days=4 - current_weekday)
        # print(f"Monday to Thursday, friday_this_week is: {friday_this_week}")
    else:  # If today is Saturday or Sunday
        friday_this_week = current_date - timedelta(days=(current_weekday - 4))
        # print(f"Saturday to Sunday, friday_this_week is: {friday_this_week}")

    # 检查是否已经存在当前周五的 Create & Freeze Release Branch
    for item in data["data"]:
        freeze_branch_date = datetime.strptime(
            item["date"]["Create & Freeze Release Branch"], '%Y-%m-%d').date()
        # print(f"Create & Freeze Release Branch is: {freeze_branch_date}")
        if freeze_branch_date == friday_this_week:
            return False

    return True


# 计算新的"Release Plan"


def calculate_next_release_plan(last_release_plan_date):
    last_release_plan = datetime.strptime(last_release_plan_date, '%Y-%m-%d')
    next_friday = last_release_plan + \
        timedelta(days=7 + (1 - last_release_plan.weekday()) % 7)
    return next_friday.strftime('%Y-%m-%d')

# 计算新的"Create & Freeze Release Branch"


def calculate_next_freeze_branch(next_release_plan_date):
    next_release_plan = datetime.strptime(next_release_plan_date, '%Y-%m-%d')
    next_tuesday = next_release_plan - \
        timedelta(days=(next_release_plan.weekday() + 3))
    return next_tuesday.strftime('%Y-%m-%d')

# 处理新条目


def create_new_entry(data):
    last_entry = data["data"][0]
    new_release_plan_date = calculate_next_release_plan(
        last_entry["date"]["Release Plan"])
    new_create_freeze_date = calculate_next_freeze_branch(
        new_release_plan_date)

    new_entry = {
        "date": {
            "Release Plan": new_release_plan_date,
            "Create & Freeze Release Branch": new_create_freeze_date
        },
        "ReleaseVersion": {}
    }

    for key, version in last_entry["ReleaseVersion"].items():
        if key == "commons":
            new_entry["ReleaseVersion"][key] = increment_commons_version(
                version)
        elif key == "public-api":
            new_entry["ReleaseVersion"][key] = increment_public_api_version(
                version)
        else:
            new_entry["ReleaseVersion"][key] = increment_version(version)

    return new_entry

# 主函数


def main(file_path, use_date_logic=False):  # 默认 use_date_logic 为 False
    data = read_json(file_path)

    if should_add_new_entry(data, use_date_logic):
        new_entry = create_new_entry(data)
        data["data"].insert(0, new_entry)  # 将新条目插入到最前面
        save_json(data, file_path)
    else:
        print("There is already a Release Plan for the current Friday, so there is no need to create a new entry")


if __name__ == "__main__":
    main("Test/releaseVersion.json", use_date_logic=True)
