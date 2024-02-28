const userEmail = document.getElementById('userEmail');
const userRole = document.getElementById('userRole');
const showAllUser = document.getElementById('showAllUser');
const textBody = document.getElementById('textBody');
let userInfoHeader = "";

showUsers()

function showUsers() {
    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(users => {
            let usersTable = [];
            if (users.length > 0) {
                users.forEach(user => {
                    usersTable.push(user);
                })
            } else {
                usersTable = [];
            }
            showAllUsers(usersTable);
        })
}

fetch("http://localhost:8080/api/userinfo")
    .then(res => res.json())
    .then(data => {
        userInfoHeader = data;
        userEmail.innerText = userInfoHeader.email;
        userRole.innerText = userInfoHeader.roles.map(role => role.name.substring(5, role.length)).join(", ");
    });

function showAllUsers(users) {
    let text = "";
    users.forEach(user => {
        text += `
        <tr class= "text-center align-middle">
        <td>` + user.id + `</td>
        <td>` + user.username + `</td>
        <td>` + user.lastName + `</td>
        <td>` + user.age + `</td>
        <td>` + user.email + `</td>
        <td>` + user.roles.map(role => role.name.substring(5, role.length)).join(", ") + `</td>
        <td>
            <button type="button" class="btn btn-info" data-bs-toggle="modal"
                data-bs-target="#editModal">Edit
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#deleteModal">Delete
            </button>
        </td>
        </tr>`
    })
    showAllUser.innerHTML = text;
}

// function showNewUsers() {
//     userInfoTable = "";
//     fetch("http://localhost:8080/api/users/new")
//         .then(res => res.json())
//         .then(user => {
//             userInfoTable += `
//     < h2
//
//     class
//
//     = "mt-3" > Admin
//     panel < /h2>
//     <div class="nav nav-tabs mb-2">
//         <button data-bs-toggle="tab" class="nav-link" onclick="showUsers()">Users table</button>
//         <button data-bs-toggle="tab" class="nav-link active" onclick="showNewUsers()">New User</button>
//     </div>
//     <h4>Add new user</h4>
//     <form class="text-center fw-bold bg-white pt-3" action="http://localhost:8080/api/users/new" method="post">
//         <div class="form-group mx-auto col-4">
//             <input name="id" type="hidden" id="id">
//         </div>
//         <div class="form-group mx-auto col-4">
//             <label for="firstName">First name</label>
//             <input name="username" type="text" class="form-control" id="firstName">
//         </div>
//         <div class="form-group mx-auto mt-2 col-4">
//             <label for="lastName">Last name</label>
//             <input name="lastName" type="text" class="form-control" id="lastName">
//         </div>
//         <div class="form-group mx-auto mt-2 col-4">
//             <label for="age">Age</label>
//             <input name="age" type="number" class="form-control" id="age">
//         </div>
//         <div class="form-group mx-auto col-4">
//             <label for="email">Email</label>
//             <input name="email" type="email" class="form-control" id="email">
//         </div>
//         <div class="form-group mx-auto mt-2 col-4">
//             <label for="password">Password</label>
//             <input name="password" type="password" class="form-control" id="password">
//         </div>
//         <div class="form-group mx-auto mt-2 col-4">
//             <label for="role">Role</label>
//             <select name="roles" size="2"
//                     multiple required class="form-select mx-auto"
//                     aria-label="Default select" id="roles">
//                 <option value="1" selected>ADMIN</option>
//                 <option value="2" selected>USER</option>
//             </select>
//         </div>
//         <div class="form-group mx-auto mt-2 col-4 mb-3">
//             <button type="submit" class="btn btn-success">Add new user</button>
//         </div>
//     </form>
// `
//             textBody.innerHTML = userInfoTable;
//         })
// }

function showUser() {
    userInfoTable = "";
    fetch("http://localhost:8080/api/userinfo")
        .then(res => res.json())
        .then(data => {
            userInfoTable += `    
    <h2 class="mt-3">User information page</h2>

    <h4>About users</h4>
    <table class="table bg-white">

        <thead>
        <tr class="text-center">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
        </thead>

        <tbody>
        <tr class="text-center align-middle">
            <td>` + data.id + `</td>
            <td>` + data.username + `</td>
            <td>` + data.lastName + `</td>
            <td>` + data.age + `</td>
            <td>` + data.email + `</td>
            <td>` + data.roles.map(role => role.name.substring(5, role.length)).join(", ") + `</td>
        </tr>
        </tbody>
    </table>
    `
            textBody.innerHTML = userInfoTable;
        })
}