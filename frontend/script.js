const apiUrl = "http://localhost:3000/users";
const usersList = document.getElementById("usersList");
const userForm = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");
const searchInput = document.getElementById("searchInput");

let allUsers = []; // store all users for search

// -------------------- FETCH USERS --------------------
async function fetchUsers() {
    usersList.innerHTML = "Loading...";
    try {
        const response = await fetch(apiUrl);
        allUsers = await response.json();
        displayUsers(allUsers);
    } catch (error) {
        usersList.innerHTML = "Failed to load users.";
        console.error(error);
    }
}

// -------------------- DISPLAY USERS --------------------
function displayUsers(users) {
    usersList.innerHTML = users.map(user => `
        <div id="user-${user.id}">
            <span><strong>${user.name}</strong> - ${user.email}</span>
            <div>
                <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// -------------------- ADD USER --------------------
async function addUserSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    // Basic validation
    if (!name || !email.includes('@')) {
        alert("Please enter a valid name and email.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            const newUser = await response.json();
            fetchUsers();
            userForm.reset();

            // Highlight new user
            setTimeout(() => {
                const el = document.getElementById(`user-${newUser.id}`);
                if (el) el.classList.add("highlight");
                setTimeout(() => el.classList.remove("highlight"), 1000);
            }, 100);
        } else alert("Failed to add user.");
    } catch (error) {
        console.error(error);
    }
}

userForm.addEventListener("submit", addUserSubmit);

// -------------------- DELETE USER --------------------
async function deleteUser(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) fetchUsers();
    } catch (error) {
        console.error(error);
    }
}

// -------------------- EDIT USER --------------------
function editUser(id, name, email) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    submitBtn.textContent = "Update User";

    // Remove previous add handler
    userForm.removeEventListener("submit", addUserSubmit);

    const updateHandler = async function(e) {
        e.preventDefault();
        const updatedName = document.getElementById("name").value.trim();
        const updatedEmail = document.getElementById("email").value.trim();

        if (!updatedName || !updatedEmail.includes('@')) {
            alert("Please enter a valid name and email.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedName, email: updatedEmail })
            });

            if (response.ok) {
                fetchUsers();
                userForm.reset();
                submitBtn.textContent = "Add User";

                userForm.addEventListener("submit", addUserSubmit);
                userForm.removeEventListener("submit", updateHandler);

                // Highlight updated user
                setTimeout(() => {
                    const el = document.getElementById(`user-${id}`);
                    if (el) el.classList.add("highlight");
                    setTimeout(() => el.classList.remove("highlight"), 1000);
                }, 100);
            } else alert("Failed to update user.");
        } catch (error) {
            console.error(error);
        }
    };

    userForm.addEventListener("submit", updateHandler);
}

// -------------------- SEARCH USERS --------------------
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allUsers.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
    displayUsers(filtered);
});

// -------------------- INITIAL FETCH --------------------
fetchUsers();
