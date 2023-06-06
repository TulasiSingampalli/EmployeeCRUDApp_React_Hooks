import React, { useState, useCallback } from "react";
import "./styles.css";

function EmployeeForm() {
  const [employees, setEmployees] = useState([
    { name: "George", age: 32 },
    { name: "Edward", age: 17 },
    { name: "Christine", age: 58 },
    { name: "Sarah", age: 32 }
  ]);
  const [search, setSearch] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", age: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
  };

  const handleEditEmployee = useCallback(
    (index) => {
      setEditIndex(index);
      setNewEmployee(employees[index]);
    },
    [employees]
  );

  const handleAddEmployee = useCallback(
    (event) => {
      event.preventDefault();
      if (
        newEmployee.name.trim() !== "" &&
        newEmployee.age &&
        newEmployee.age > 0
      ) {
        setEmployees([...employees, newEmployee]);
        setNewEmployee({ name: "", age: "" });
        setErrorMsg("");
      } else {
        setErrorMsg("Please enter a valid name and age.");
      }
    },
    [employees, newEmployee]
  );

  const handleUpdateEmployee = (event) => {
    event.preventDefault();
    if (
      newEmployee.name.trim() !== "" &&
      newEmployee.age &&
      newEmployee.age > 0
    ) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setNewEmployee({ name: "", age: "" });
      setEditIndex(null);
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter a valid name and age.");
    }
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    setErrorMsg("");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setErrorMsg("");
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      handleUpdateEmployee(event); // pass the event object to the function
    } else {
      handleAddEmployee(event);
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Employee Management App</h2>
        <form className="search">
          <input
            type="text"
            placeholder="Search Employee ..."
            onChange={handleSearch}
          />
        </form>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <label htmlFor="age"> Age</label>
          <input
            type="number"
            name="age"
            min="1"
            max="100"
            placeholder="Age "
            value={newEmployee.age}
            onChange={handleInputChange}
          />
          <br />
          {editIndex !== null ? (
            <button className="addEmp" type="submit">
              Update Employee
            </button>
          ) : (
            <button type="submit" className="addEmp">
              Add Employee
            </button>
          )}
        </form>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <table className="centerTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="3">No data found.</td>
              </tr>
            ) : (
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="row">
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEditEmployee(index)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="delete"
                      onClick={() => handleDeleteEmployee(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default EmployeeForm;
