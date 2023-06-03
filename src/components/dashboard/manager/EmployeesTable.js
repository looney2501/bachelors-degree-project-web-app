import EmployeesTableRow from './EmployeesTableRow'
import React from 'react'

const EmployeesTable = ({ employees }) => {
  return (
    <div className="bg-body rounded shadow-sm p-3 overflow-auto">
      <h5 className="pb-2 m-0">Angajati departament</h5>
      <div className="employees-table table-container overflow-auto">
        <div className="d-flex text-muted overflow-auto">
          <table className="table overflow-auto">
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((e) => (
                <EmployeesTableRow key={e.id} employee={e} />
              )
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeesTable
