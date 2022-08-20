


import React, { useState, useEffect, useContext } from 'react'
import './Profile.css'
import Man from '../../man.png'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'
const Profile = () => {

  const [modelOpend, setModelOpend] = useState(false)
  const [user, setuser] = useState({})
  const [admin,setAdmin]=useState(false)
  const navigate = useNavigate()
  const { handleAuthAdmin } = useContext(AdminContext)

  const [profileUser, setProfileUser] = useState({})
  useEffect(() => {
    const fetchProfileUser = (sessionStorage.getItem('LoggedUser'))
    if (fetchProfileUser) {
      if (JSON.parse(fetchProfileUser).email) {
        setuser(JSON.parse(fetchProfileUser))
       // console.log("ppp",JSON.parse(fetchProfileUser).isAdmin)
        setAdmin(JSON.parse(fetchProfileUser).isAdmin)
      }
    } else {
      navigate('/', { replace: true });
    }

  }, [])

  const handleLogOut = () => {
    //dispatch(logOut())
    sessionStorage.clear();
    navigate('/')
  }

  const handleAdmin=()=>{
    handleAuthAdmin()
    navigate('/admin')
  }
  return (
    <div className='InfoCard'>
      <div className='menu'>
        <div className='infohead'>
          <h2>User Information</h2>
        </div>
        <div className='info'>
          <div>
            <b>Name {" "}</b>-
            <p>{user.firstname + ' ' + user.lastname}</p>
          </div>
        </div>
        <div className='info'>
          <div>
            <b>Email {" "}</b>-
            <p>{user.email}</p>
          </div>
        </div>
        <div className='info'>
          <div>
            <b>Introduction {"   "}</b>
            <p>{admin? "Admin":"User"}</p>
          </div>
        </div>
        
      </div>
      
      <div>
        <img className='manimg' src={Man} />
        {user.isAdmin ?
          <button className='button logout-button' onClick={handleAdmin}>See All Users</button>
        :""}
        <button className='button logout-button' onClick={handleLogOut}>Logout</button>
        
      </div>

    </div>
  )
}

export default Profile


