import { Routes, Route } from 'react-router-dom'
import RequireAuth from './auth/RequireAuth'
import { Layout } from './layouts'
import { Admin, Home, Login, Missing, Register, Unauthorized } from './pages'

const ROLES = {
  User: 'user',
  Editor: 'editor',
  Admin: 'admin',
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
