import { Link } from "react-router-dom"

const Unauthorised = () => {
    return (
        <div>
            <h1>Unauthorised</h1>
            <p><Link to="/">back to Home</Link></p>
        </div>
    )
}

export default Unauthorised
