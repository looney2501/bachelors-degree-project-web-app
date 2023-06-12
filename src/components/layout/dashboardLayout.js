import Sidebar from './sidebar'

const dashboardLayout = ChildComponent => props => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar/>
      <div className="main" id="page-content-wrapper">
        <ChildComponent {...props} />
      </div>
    </div>
  )
}

export default dashboardLayout
