import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import { Bars, Preloader } from 'react-preloader-icon'
import LoadingScreen from './loading/LoadingScreen'

const adminLayout = (ChildComponent) => {
  class AdminLayout extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        pageLoaded: true,
        saveLeadClickEvent: ''
      }
    }

    // componentDidMount() {
    //   setTimeout(() => {
    //     this.setState(() => ({
    //       pageLoaded: true
    //     }))
    //   }, 1000)
    // }

    renderHtml() {
      if (!this.state.pageLoaded) {
        return <LoadingScreen />
      }

      return <div className="d-flex" id="wrapper">
        {/* <!-- Sidebar--> */}
        <Sidebar/>
        {/* <!-- Page content wrapper--> */}
        <div className="main" id="page-content-wrapper">
          {/* <!-- Top navigation--> */}
          {/*<Header/>*/}
          {/* <!-- Page content--> */}
          <div className="container-fluid mt-0 content-container h-100">
            <ChildComponent {...this.props} />
          </div>
        </div>
      </div>
    }

    addLeadModalFooterContent() {
      return <>
        <div style={{ width: '100%' }}>
          <button
            onClick={(e) => this.setState(() => ({ saveLeadClickEvent: (Math.random() + 1).toString(36).substring(7) }))}
            className="btn btn-default low-height-btn">Add Lead
          </button>
        </div>
      </>
    }

    handleParentData = (e) => {
      console.log(e)
    }

    render() {
      return <>
        {this.renderHtml()}
      </>
    }
  }

  return AdminLayout
}

export default adminLayout
