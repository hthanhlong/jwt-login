import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()
  console.log('auth.refreshToken', auth.refreshToken)
  const refresh = async () => {
    const response = await axios.post('/token', {
      refreshToken: auth.refreshToken,
    })
    setAuth((prev) => {
      console.log(JSON.stringify(prev))
      console.log(response.data?.data?.accessToken)
      return { ...prev, accessToken: response.data.accessToken }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
