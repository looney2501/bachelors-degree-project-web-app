import Sidebar from './sidebar'
import LoadingScreen from '../loading/LoadingScreen'
import { useSelector } from 'react-redux'

const dashboardLayout = ChildComponent => props => {
  const isLoading = useSelector(state => state.auth.isLoading)

  return (
    <>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <div className="d-flex" id="wrapper">
          <Sidebar/>
          <div className="main" id="page-content-wrapper">
            <ChildComponent {...props} />
          </div>
        </div>
      )}
    </>
  )
}

export default dashboardLayout
