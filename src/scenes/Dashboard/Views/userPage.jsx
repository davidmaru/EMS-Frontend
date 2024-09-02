import { useEffect, /*useRef*/ useState } from "react";
import RolesBtnList from "../components/rolesBtnList";
import UserSearch from "../components/userSearch";
import UsersList from "../components/usersList";
import "../scss/userPage.scss";
import { useRolesQuery, useUsersQuery } from "../../../hooks/useUserQuery";
import CircularProgress from "@mui/material/CircularProgress";

export default function UsersPage() {
    const [userList, setUserList] = useState([]);
    const { loading, error, data, refetch } = useUsersQuery();

    useEffect(() => {
        refetch()
    }, [])
    const raiseFlag = () => {
        refetch();
    }
    const {
        loading: rolesLoading,
        error: rolesError,
        data: roles,
    } = useRolesQuery();

    useEffect(() => {
        if (data && data.users) {
            setUserList(data.users);
        }
    }, [data]);

    if (loading || rolesLoading) return <CircularProgress />;
    if (error || rolesError)
        return (
            <>
                {" "}
                <p>Error Has occures </p>{" "}
                <p>
                    {error.message} <br />
                    {rolesError.message}{" "}
                </p>{" "}
            </>
        );

    const btnHandler = (role) => {
        if (role === "All") {
            setUserList(data.users);
            return;
        }
        const newUsers = data.users.filter(
            (user) => user.role.roleGroup === role.roleGroup
        );
        setUserList(newUsers);
    };

    const searchHandler = (value) => {
        if (value !== null) {
            const searchString = value.toLowerCase();
            const searchresult = data.users.filter(
                (user) =>
                    user.userName.toLowerCase().includes(searchString) ||
                    user.userEmail.toLowerCase().includes(searchString)
            );
            setUserList(searchresult);
        }
    };
    return (
        <div className="user-page">
            <UserSearch handler={searchHandler} />
            <hr />
            <RolesBtnList roles={roles.roles} handler={btnHandler} />
            <hr />
            <UsersList users={userList} roles={roles.roles} triggerFlag={raiseFlag} />
        </div>
    );
}
