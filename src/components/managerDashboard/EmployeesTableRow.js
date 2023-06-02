const EmployeesTableRow = ({ employee }) => {
  return (
    <tr>
      <td>{employee.first_name}</td>
      <td>{employee.last_name}</td>
      <td>{employee.email}</td>
      <td>
        <button type="button" className="btn btn-primary">Generate Report</button>
      </td>
    </tr>
  )
}

export default EmployeesTableRow
