import { axiosClient } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        console.log("🚀 ~ file: useAxiosPrivate.js ~ line 25 ~ prevRequest", prevRequest)
        const newAccessToken = await refresh()
        console.log(
          '🚀 ~ file: useAxiosPrivate.js ~ line 29 ~ newAccessToken',
          newAccessToken,
        )
        prevRequest.headers['authorization'] = `${newAccessToken}`
        return axiosClient(prevRequest)
      },
    )

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept)
      axiosClient.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosClient
}

export default useAxiosPrivate
