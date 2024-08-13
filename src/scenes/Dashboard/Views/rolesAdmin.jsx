import { CircularProgress } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { usePermissions, useRolesDetails } from "../../../hooks/useUserQuery"
import "../scss/rolesAdmin.scss"
import EditDisplay from "../components/editDisplay"
import { useState } from "react"
import EditPermissions from "../components/editPermissions";

export default function RolesAdmin() {
    const [editMode, setEditMode] = useState(false)

    const { error: rolesError, loading: rolesLoading, data: rolesData } = useRolesDetails()
    const { error: permError, loading: permLoading, data: permData } = usePermissions()
    const [selectedRoleId, setSelectedRoleId] = useState(0);

    if (rolesError || permError) {
        return <><p>Error Has occured appologies</p><p>{rolesError.message || permError.message}</p></>
    }
    if (rolesLoading || permLoading) {
        return <CircularProgress />
    }
    const roles = rolesData.rolesDetails;
    const getRole = (id) => {
        return roles.find((role) => role.id === id)
    }
    const selectedRole = getRole(selectedRoleId)
    return (
        <div className="roles-admin">
            <div className="roles-details">
                {selectedRole ?
                    (<>
                        <EditDisplay defaultValue={selectedRole.roleGroup} />
                        <hr />
                        <h3>
                            <span className="text">
                                Permissions
                            </span>
                            <EditIcon fontSize="small" className="icon" onClick={(_) => setEditMode(!editMode)} />
                        </h3>
                        {editMode
                            ? (
                                <EditPermissions permissions={permData.permissions} rolePermissions={selectedRole.permissions} />
                            )
                            : (
                                <ul className="perms">
                                    {selectedRole.permissions.map(perm => <li key={perm}>{perm}</li>)}
                                </ul>
                            )
                        }

                    </>
                    )
                    : (<p>Role does not exist</p>)}


            </div>
            <ul className="roles">
                {roles.map((role) => <li key={role.id} onClick={(_) => setSelectedRoleId(role.id)} >{role.roleGroup}</li>)}
            </ul>
        </div>
    )
}