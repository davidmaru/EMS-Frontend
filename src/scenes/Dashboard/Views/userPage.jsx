// import Search from "../components/search";
import { useState } from "react";
import RolesBtnList from "../components/rolesBtnList";
import UserSearch from "../components/userSearch";
// import UsersList from "../components/usersList";
import UsersList from "../components/usersList";
import roles from "../data/roles.json"
import users from "../data/users.json"
import "../scss/userPage.scss"

export default function UsersPage() {
    const [userList, setUserList] = useState(users.users);
    const btnHandler = (role) => {
        const newUsers = users.users.filter((user) => role.roleGroup == "" || user.role.roleGroup === role.roleGroup)
        setUserList(newUsers)
    }
    const searchHandler = (value) => {
        if (value !== null) {
            const searchString = value.toLowerCase()
            const searchresult = users.users.filter((user) => user.userName.toLowerCase().includes(searchString) || user.userEmail.toLowerCase().includes(searchString))
            // console.log(searchresult)
            setUserList(searchresult);
        }
    }
    return (
        <div className="user-page">
            <UserSearch handler={searchHandler} />
            <hr />
            <RolesBtnList roles={roles.roles} handler={btnHandler} />
            <hr />
            <UsersList users={userList} roles={roles.roles} />
        </div>
    )
}