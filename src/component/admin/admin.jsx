import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'
import './admin.css'
const AdminPage = () => {
    const [allUsers, setAllUsers] = useState([])
    const [sortByName, setSortByname] = useState("")
    const { auth } = useContext(AdminContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!auth){
       navigate("/")
        }
        getUsers()
    }, [])

    const getUsers = () => {
        axios({
            url: "http://localhost:1234/allusers",
            method: "GET"
        }).then((res) => {
            setAllUsers(res.data)
            // console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div id='tableDiv'>
            <div id='tableTopDiv'>
                <div>
                    <h1>All users</h1>
                    <h3>Complete information of all the users</h3>
                </div>

                <div>
                    <button onClick={() => navigate(-1)} className='button  logout-button'>Previous Page</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th >
                            <span className='tableHeading'>
                                Name
                                <span className='sorticons'>
                                    <i class="fa fa-fw fa-sort-asc"></i>
                                    <i class="fa fa-fw fa-sort-desc"></i>
                                </span>
                            </span>
                        </th>
                        <th><span className='tableHeading'>
                            Date of Birth
                            <span className='sorticons'>
                                <i class="fa fa-fw fa-sort-asc"></i>
                                <i class="fa fa-fw fa-sort-desc"></i>
                            </span>
                        </span></th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((el, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{el.firstname + " " + el.lastname}</td>
                            <td>{el.dateOfBirth}</td>
                            <td>{el.email}</td>
                            <td>{el.isAdmin ? "Admin" : "Normal User"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage
