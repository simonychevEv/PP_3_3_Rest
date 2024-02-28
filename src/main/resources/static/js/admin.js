const userEmail = document.getElementById('userEmail');
const userRole = document.getElementById('userRole');
const showAllUser = document.getElementById('showAllUser');
const userInfo = document.getElementById('userInfo');
const addNewUserBtn = document.getElementById('newUser');
let userInfoHeader = "";

addNewUserBtn.addEventListener('submit', addNewUser);

showUsers()

fetch("http://localhost:8080/api/userinfo")
    .then(res => res.json())
    .then(data => {
        userInfoHeader = data;
        showUser(userInfoHeader);
        userEmail.innerText = userInfoHeader.email;
        userRole.innerText = userInfoHeader.roles.map(role => role.name.substring(5, role.length)).join(", ");
    });

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

function showUser(user) {
    userInfo.innerHTML = `
        <tr class="text-center align-middle">
            <td>` + user.id + `</td>
            <td>` + user.username + `</td>
            <td>` + user.lastName + `</td>
            <td>` + user.age + `</td>
            <td>` + user.email + `</td>
            <td>` + user.roles.map(role => role.name.substring(5, role.length)).join(", ") + `</td>
        </tr>     
    `;
}

function addNewUser(event) {
    event.preventDefault();
    let formNewUser = new FormData(event.target);
    let user = {
        username: formNewUser.get('username'),
        lastName: formNewUser.get('lastName'),
        age: formNewUser.get('age'),
        email: formNewUser.get('email'),
        password: formNewUser.get('password'),
        roles: rolesUser('#roles'),
    };
    let request = new Request('/api/users/new', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then(() => showUsers());
    event.target.reset();
}

function createRole(id, name) {
    return {
        id,
        name,
    };
}

function rolesUser(event) {
    const rolesAdmin = createRole(1, "ROLE_ADMIN");
    const rolesUser = createRole(2, "ROLE_USER");
    let roles = [];
    let allRoles = [];
    let sel = document.querySelector(event);
    for (let i = 0, n = sel.options.length; i < n; i++) {
        if (sel.options[i].selected) {
            roles.push(sel.options[i].value);
        }
    }
    if (roles.includes('1')) {
        allRoles.push(rolesAdmin);
    }
    if (roles.includes('2')) {
        allRoles.push(rolesUser);
    } else if (roles.length === 0) {
        allRoles.push(rolesUser)
    }
    return allRoles;
}