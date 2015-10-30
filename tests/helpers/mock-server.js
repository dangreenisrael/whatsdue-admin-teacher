import Pretender from 'pretender';
export default new Pretender(function(userType){
    var assignments = {};
    var COURSES = {};
    if (userType !== "new"){
        assignments = {
            "assignment": [
                {
                    "id": 9120,
                    "course_id": 345,
                    "assignment_name": "Test 1",
                    "description": "",
                    "due_date": "2015-11-06 09:00",
                    "archived": false,
                    "time_visible": false,
                    "is_bulk": true,
                    "bulk_id": 2147483647,
                    "created_at": 1444216140,
                    "last_updated": 1445244691,
                    "last_modified": 1445244691
                },
                {
                    "id": 9171,
                    "course_id": 1457,
                    "assignment_name": "Test 2",
                    "description": "",
                    "due_date": "2015-11-06 09:00",
                    "archived": false,
                    "time_visible": false,
                    "is_bulk": true,
                    "bulk_id": 2147483647,
                    "created_at": 1445162569,
                    "last_modified": 1445162569
                },
                {
                    "id": 9172,
                    "course_id": 1457,
                    "assignment_name": "Test 3",
                    "description": "",
                    "due_date": "2015-11-13 09:00",
                    "archived": false,
                    "time_visible": false,
                    "is_bulk": true,
                    "bulk_id": 2147483647,
                    "created_at": 1445162569,
                    "last_modified": 1445162569
                }
            ]
        };

        COURSES = {
            345: {
                "id": 345,
                "course_name": "Course 1",
                "course_code": "QEGACY",
                "instructor_name": " UMD Physics",
                "user_id": 125,
                "archived": false,
                "created_at": 1423584528,
                "last_updated": 1444908834,
                "last_modified": 1444908834
            },
            400:{
                "id": 400,
                "course_name": "Course 2",
                "course_code": "UFWRLS",
                "instructor_name": " Dan Green",
                "user_id": 111,
                "archived": false,
                "created_at": 1424790828,
                "last_updated": 1444662983,
                "last_modified": 1444662983
            },
            1456: {
                "id": 1456,
                "course_name": "Course 3",
                "course_code": "LKDZRU",
                "instructor_name": " Dan Green",
                "user_id": 111,
                "archived": false,
                "created_at": 1442482195,
                "last_updated": 1445424734,
                "last_modified": 1445424734
            }
        };
    }

    let getSerialized = function(array, model){
        let all =  Object.keys(COURSES).map(function(k){return COURSES[k];});
        let response = {};
        response[model] = all;
        return JSON.stringify(response);
    };

    /* Course Routes */
    this.get('/api/teacher/courses', function(request){
        return [200, {"Content-Type": "application/json"}, getSerialized(COURSES, "course")];
    });

    this.get('/api/teacher/courses/:id', function(request){
        let response = JSON.stringify({'course': COURSES[request.params.id]});
        return [200, {"Content-Type": "application/json"}, response];
    });

    /* Assignment Routes */
    this.get('/api/teacher/assignments', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify(assignments)];
    });

    this.post('/api/teacher/assignments', function(request){
        let assignment = JSON.parse(request.requestBody).assignment;
        if (
            assignment.assignment_name &&
            assignment.due_date
        ) {
            let response =
                {"assignment": {
                    "id":12345,
                    "course_id":assignment.course_id,
                    "assignment_name":assignment.assignment_name,
                    "description":assignment.description,
                    "due_date":assignment.due_date,
                    "archived":false,
                    "time_visible":assignment.time_visible,
                    "created_at":1446195088,
                    "last_modified":1446195088
                }};
            return [200, {"Content-Type": "application/json"},  JSON.stringify(response)];
        } else{
            throw "Problem with adding assignment";
        }
    });
});
