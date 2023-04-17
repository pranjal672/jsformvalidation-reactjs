import Login from "./component/Login"
import Register from "./component/Register"
import Unauthorised from "./component/Unauthorised"
import LinkPage from "./component/LinkPage"
import Home from "./component/Home"
import Editor from "./component/Editor"
import Admin from "./component/Admin"
import Lounge from "./component/Lounge"
import Missing from "./component/Missing"
import Layout from "./component/Layout"
import RequireAuth from "./component/RequireAuth"
import PersistentLogin from "./component/PersistentLogin"

import { Routes, Route } from "react-router-dom"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorised" element={<Unauthorised />} />
                <Route path="linkpage" element={<LinkPage />} />

                {/* Protected Routes */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth allowedRoles={[2001]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[1984]} />}>
                        <Route path="editor" element={<Editor />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[5150]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
                        <Route path="lounge" element={<Lounge />} />
                    </Route>
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
