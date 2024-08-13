import { useEffect, useState } from "react"
import "../scss/editPermissions.scss"
export default function EditPermissions({ permissions, rolePermissions, handler = () => { } }) {
    const [selectedPerm, setSelectedPerm] = useState(rolePermissions)
    useEffect(() => {
        if (rolePermissions) {
            // console.log(rolePermissions)    
            setSelectedPerm(rolePermissions)
        }
    }, [rolePermissions])
    function handleChange(perm) {
        if (selectedPerm.includes(perm)) {
            setSelectedPerm((prev) => prev.filter((p) => p !== perm))
        }
        else {
            setSelectedPerm((prev) => [...prev, perm]);
        }
    }
    function handleSave() {
        handler(selectedPerm)
    }
    return (
        <div className="edit-permissions">
            <div className="boxes">
                {permissions.map((perm) => (
                    <label key={perm}>
                        <input type="checkbox" name={perm} value={perm}
                            // defaultChecked={selectedPerm.includes(perm)}
                            checked={selectedPerm.includes(perm)}
                            onChange={(_) => handleChange(perm)}
                        />
                        <p>
                            {perm}
                        </p>
                    </label>
                ))}
            </div>
            <div className="btns" onClick={(_) => handleSave()}>
                <button>
                    Save Changes
                </button>
                <button onClick={(_) => setSelectedPerm(rolePermissions)}>
                    Discard Changes
                </button>
            </div>
        </div>
    )
}