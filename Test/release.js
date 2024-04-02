let projects = [];
data.forEach(function(item) {
    if(item["Custom field (Affects Project)"]) {
        // 假设 "Custom field (Affects Project)" 这一列的数据是以空格或逗号隔开的
        let projectNames = item["Custom field (Affects Project)"].split(/[\s,]+/);
        projectNames.forEach(function(name) {
            if(!projects.includes(name)) {
                projects.push(name);
            }
        });
    }
});
console.log(projects.join('\n'));