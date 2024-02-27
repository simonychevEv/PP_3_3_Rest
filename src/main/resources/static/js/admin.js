const userEmail = document.getElementById('userEmail');
const userRole = document.getElementById('userRole');
const showAllUser = document.getElementById('showAllUser');
const newUser = document.getElementById('newUser');
let userInfoHeader = "";
let userInfoTable = "";

showUsers();

fetch("http://localhost:8080/api/userinfo")
    .then(res => res.json())
    .then(data => {
        userInfoHeader = data;
        userEmail.innerText = userInfoHeader.email;
        userRole.innerText = userInfoHeader.roles.map(role => role.name.substring(5, role.length)).join(", ");
    });

function showUsers() {
    userInfoTable += `
        <div class="mx-4">
            <h2 class="mt-3">Admin panel</h2>

            <div class="nav nav-tabs mb-2">
                <button data-bs-toggle="tab" class="nav-link active">Users table</button>
                <button data-bs-toggle="tab" class="nav-link" onclick="alert('Клик!')">New User</button>
            </div>

        </div>
        <h4>All users</h4>
        <table class="table bg-white">           
        <thead>
        <tr class="text-center">
             <th>ID</th>
             <th>First Name</th>
             <th>Last Name</th>
             <th>Age</th>
             <th>Email</th>
             <th>Role</th>
             <th>Edit</th>
             <th>Delete</th>
        </tr>
        </thead>
        <tbody>`
    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                userInfoTable += `
                <tr class="text-center align-middle">
                <td>` + user.id + `</td>
                <td>` + user.username + `</td>
                <td>` + user.lastName + `</td>
                <td>` + user.age + `</td>
                <td>` + user.email + `</td>
                <td>` + user.roles.map(role => role.name.substring(5, role.length)).join(", ") + `</td>
                    <td>
                        <button type="button" class="btn btn-info" data-bs-toggle="modal"
                                data-bs-target="#editModal">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                data-bs-target="#deleteModal">Delete
                        </button>
                    </td>
                    </tr>                    
            `
            })
            userInfoTable += `
            </tbody>
            </table>
        `
            showAllUser.innerHTML = userInfoTable;
        });
}