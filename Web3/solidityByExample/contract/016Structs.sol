// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Todos {

    struct Todo {
        string text;
        bool completed;
    }

    Todo[] public todos;

    struct students {
        string name;
        uint grade;
        bool pass;
    }

    students[] public stu; // 变量前呦public时， 自动创建了一个get函数

    function set(string calldata _name, uint _grade, bool _pass) public {
        // 3 ways to initialize a struct

        // - calling it like a function
        stu.push(students(_name,_grade,_pass)); 

        // key value mapping
        stu.push(students({grade: _grade, name: _name, pass: _pass}));

        // initialize an empty struct and then update it
        students memory Mystu;
        Mystu.name = _name;
        Mystu.grade = _grade;
        Mystu.pass = _pass;
        stu.push(Mystu);
    }

    // function get(uint _index) public view returns (string memory name, uint grade, bool pass) {
    // 0: string: name fewd
    // 1: uint256: grade 99
    // 2: bool: pass false

    function get(uint _index) public view returns (string memory, uint, bool) {

        return (stu[_index].name,stu[_index].grade,stu[_index].pass);
    }

    function updateName(uint _index, string calldata _name) public {
        students storage newStudent = stu[_index];
        newStudent.name = _name;
        // stu[_index].name = _name;
    }
}