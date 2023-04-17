import { Link } from "react-router-dom"
import Users from "./Users"

const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>
            <br />
            <Users />
            <br />
            <p><Link to="/">back to Home</Link></p>
        </div>
    )
}

export default Admin
