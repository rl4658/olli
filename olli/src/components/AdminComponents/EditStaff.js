import React, { useEffect, useState } from 'react'

export default function EditStaff({ Update, changed }) {
    const [error, setError] = useState()
    const [user, setUser] = useState()
    const [staff, setStaff] = useState([])
    console.log(staff)

    const [staffInfo, setStaffInfo] = useState({
        name: "",
        email: "",
        wage: "",
        clockIn: "",
        clockOut: "",
        isOnline: 0,
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('called')
            setUser(JSON.parse(storedUser));
        }



    }, [])

    useEffect(() => {

        if (user) {
            fetcher("/staff/getAll", "GET", user.accessToken, null, setStaff, errorHandler("There are no Hired Staff", setError))
        }

    }, [user, changed])

    function errorHandler(message, setter) {
        return () => {
            setter(message)
        }
    }

    async function fetcher(url, method, accessToken, body, setter, errorHandler) {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${accessToken}`
                },

            })
        }
        else {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(body)
            })
        }

        if (!response.ok) {
            errorHandler()
            return;
        }
        else if (setter) {
            const data = await response.json()
            setter(data)
        }
    }

    const handleChange = (e, regex) => {
        let { name, value } = e.target;
        value = value.replace(regex, "")
        setStaffInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSelectChange = (e) => {
        const { value } = e.target;
        fetcher(`/staff/getStaff/${value}`, "GET", user.accessToken, null, setStaffInfo, errorHandler("Could Select Staff Member", setError))
    };


    return (
        <div>
            <h2>Select a Staff Member to Edit</h2>
            {staff && <select onChange={handleSelectChange}>
                <option value="none" selected disabled hidden>Select an Staff Member</option>
                {staff && staff.map((staffMember, index) => (
                    <option key={index} value={staffMember.email}>{staffMember.name}</option>
                ))}
            </select>}

            <input
                type="text"
                placeholder='Enter name'
                name="name"
                value={staffInfo.name}
                onChange={(e) => { handleChange(e, /[^a-zA-Z]/g) }}
            />
            <input
                type="text"
                placeholder='Enter email'
                name="email"
                value={staffInfo.email}
                onChange={(e) => { handleChange(e, /[^a-zA-Z0-9@.]/g) }}
            />
            <input
                type="text"
                placeholder='Enter wage'
                name="wage"
                value={staffInfo.wage}
                onChange={(e) => { handleChange(e, /[^0-9.]/g) }}
            />
            <h3>{error}</h3>
            {user && <button onClick={() => { fetcher("/staff/updateStaff", "PUT", user.accessToken, staffInfo, null, errorHandler("Cannot Update Staff Member", setError)); Update(Math.random() * 1000000); }}>Update Staff Member</button>}

        </div>

    )
}
