import axios from 'axios'
import { deserialize } from './utils/serializationUtils'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
})

axiosInstance.interceptors.response.use(function (response) {
  if (response.config.url === '/auth/sign_in' && response.headers['access-token']) {
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
    }
    localStorage.setItem('vacations_planner', JSON.stringify({ authHeaders, currentUser: { ...response.data.data } }))
  }
  response.data = deserialize(response.data)
  return response
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.request.use(
  (config) => {
    const localState = localStorage.getItem('vacations_planner')
    if (localState) {
      const authState = JSON.parse(localState)['authHeaders']

      config.headers = {
        ...config.headers,
        'access-token': authState['access-token'],
        'client': authState['client'],
        'uid': authState['uid'],
      }
    }

    return config
  },
  error =>
    Promise.reject(error),
)

export default axiosInstance
