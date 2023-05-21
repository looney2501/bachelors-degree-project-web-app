import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
})

axiosInstance.interceptors.response.use(function (response) {
  console.log(response.headers)
  if (response.headers['access-token']) {
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
    }
    console.log('pula')
    sessionStorage.setItem('vacations_planner', JSON.stringify(authHeaders))
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.request.use(
  (config) => {
    const authState = JSON.parse(sessionStorage.getItem('vacations_planner'))

    config.headers = {
      ...config.headers,
      'access-token': authState['access-token'],
      'client': authState['client'],
      'uid': authState['uid'],
    }

    return config
  },
  error =>
    Promise.reject(error),
)

export default axiosInstance
