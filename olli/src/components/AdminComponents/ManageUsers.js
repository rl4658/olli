import { useState, useCallback, useEffect } from "react";
import React from "react";
import '../../CSS/AdminManagement/AdminManagement.css'; // css file


export default function ManageUsers(user){

// stores the list of users.  
const [users, setUsers] = useState([]); 
const [openedUsers, setOpenedUsers] = useState([]); 

// for storing the new user's information: 
const [newUserInfo, setNewUserInfo] = useState({
	username: "",
	email: "",
	phone_number: "",
});


useEffect(() => {
	fetchParents(); 
}, [])






const fetchParents = useCallback(async () => {

	const response = await fetch(`/adminControls/getParents`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${user.accessToken}`
		}
	});
	if (!response.ok) {
		return
	}
	const data = await response.json()
	console.log('Data received from server:', data);

	if (data.error) {
		console.log('no users were found')
		return
	}
	setUsers(data.users); 
}, [user.accessToken]); 



// 'INSERT INTO users (email, username, password, fName, lName, user_type, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)',


const setOpenedUser = (email) => {
    setOpenedUsers((prevOpenedUsers) => {
        // Check if the email is already in the opened users list
        const isOpened = prevOpenedUsers.includes(email);

        // If the email is already opened, remove it
        if (isOpened) {
			setNewUserInfo({
                username: "",
                email: "",
                phone_number: ""
            });
            return prevOpenedUsers.filter((userEmail) => userEmail !== email);
        } else {
            // If not, close the previously opened user and add the new one
			setNewUserInfo({
                username: "",
                email: "",
                phone_number: ""
            });
            return [email];
        }
    });
};


const updateSetOpenedList = (newEmail, prevEmail) => {
    setOpenedUsers((prevOpenedUsers) => {
        return prevOpenedUsers.map((email) => email === prevEmail ? newEmail : email);
    });
};





const handleInputChange = (e) => {
	const { name, value } = e.target;
	setNewUserInfo((prevUserInfo) => ({
		...prevUserInfo,
		[name]: value,
	}));
};


const updateUser = async (user) => {
	try {
		const response = await fetch(`/users/updateUserUsingAdmin`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.accessToken}`,
			},
			body: JSON.stringify({
				password: user.password, // password remains the same (cannot change it)
				// if any of these are empty they use the previous value. 
				username: newUserInfo.username || user.username,
				newEmail: newUserInfo.email || user.email,
				prevEmail: user.email,
				phone_number: newUserInfo.phone_number || user.phone_number,
			}),
		});
		if (!response.ok) {
			console.error("Failed to update user");
			return;
		}
		// Refresh the user list and opened list if successful. 
		updateSetOpenedList(newUserInfo.email || user.email, user.email); 
		fetchParents();
	} catch (error) {
		console.error("Error updating user:", error);
	}
};





const deleteUser = async (email) => {
    try {
        const response = await fetch(`/adminControls/deleteUser/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            }
        });
        if (!response.ok) {
            console.error("Failed to delete user");
            return;
        }
        const data = await response.json();
        if (data.error) {
            console.error("Error deleting user");
            return;
        }
		fetchParents(); 
    } catch (error) {
        console.error("Error deleting user:", error);
        return;
    }
};

// Example usage:
// const success = await deleteUser("username");
// console.log("User deletion success:", success);



return (
    <div className="container">
        <h1 className="title">Click on users to manage their account information:</h1>
        {users &&
            users.map((user) => (
                <div key={user.email} className="user-container">
                    <p onClick={() => setOpenedUser(user.email)}>
                        {user.fName} {user.lName}
                    </p>
                    {openedUsers.includes(user.email) && (
                        <div className="user-info">

                            <p>
                                Email: {user.email}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="New Email"
                                    value={newUserInfo.email}
                                    onChange={handleInputChange} 
                                    className="input"
                                />
                            </p>
                            <p>
                                Username: {user.username}
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="New Username"
                                    value={newUserInfo.username}
                                    onChange={handleInputChange}
                                    className="input"
                                />
                            </p>
                            <p>
                                Phone Number: {user.phone_number}
                                <input
                                    type="tel"
                                    name="phone_number"
                                    placeholder="New Phone Number"
                                    value={newUserInfo.phone_number}
                                    onChange={handleInputChange}
                                    className="input"
                                />
                            </p>
                            <button onClick={() => { updateUser(user) }} className="editButtons"> {/** password stays the same */}
                                Update User
                            </button>
                            <button onClick={() => { deleteUser(user.email) }} className="editButtons">
                                Delete User
                            </button>
                        </div>
                    )}
                </div>
            ))}
    </div>
);


}