const StatusMessage = ({ isLoading, error }) => {


  return (
    <div className="d-flex align-items-center">
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span style={{ color: '#dc3545' }}>Eroare! <i className="fa fa-close" /></span>
      ) : (
        <span style={{ color: '#198754' }}>Succes <i className="fa fa-check" /></span>
      )}
    </div>
  )
}

export default StatusMessage
