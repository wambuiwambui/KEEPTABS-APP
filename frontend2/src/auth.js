import { createAuthProvider } from 'react-token-auth'
import { BACKEND_URL } from './components/utility/constants'

export const { useAuth, authFetch, login, logout } =
    createAuthProvider({
        getAccessToken: data => data.access_token,
        onUpdateToken: (data) => fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            body: data.refresh_token
        })
        .then(r => r.json())
    })