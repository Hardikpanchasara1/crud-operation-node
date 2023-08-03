/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {
  CCol,
  CContainer,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  // CImage,
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CFormCheck,
}
  from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../views/css/mansi.css'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
import "../../views/css/pagiantion.css"

function userProject(props) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedMembers, setSelectedMembers] = useState([]);
  // const [member, setmember] = useState([]);
  // const [selectedType, setSelectedType] = useState('');
  // const [dropdownLabel, setDropdownLabel] = useState('CATEGORY');


  const [formData, setFormData] = useState({
    project_name: '',
    project_desc: '',
    language: '',
    created_by: '',
    priority: '',
    start_date: '',
    deadline: '',
    attachFile: ''
  });

  const [selectedProject, setSelectedProject] = useState({
    _id: '' ,
    project_name: '',
    project_desc: '',
    language: '',
    created_by: '',
    priority: '',
    start_date: '',
    deadline: '',
    // attachFile: ''
    // Add other project fields as needed
  });


  // fetch data from database..

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-project')
      // const member = await axios.get('http://localhost:5000/users')
      // setmember(member.data.user)
      console.log(response.data)
      setUsers(response.data.data)
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving user data:', error)
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  }


  // Event handler for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend server using Axios
      const config = {
        headers: {
          'content-type': "multipart/form-data"
        }
      }
      const response = await axios.post('http://localhost:8000/api/create-project', formData, config)

      setFormData({
        project_name: '',
        project_desc: '',
        language: '',
        created_by: '',
        // members: '',
        priority: '',
        start_date: '',
        deadline: '',
        attachFile: ''
      });
      fetchData();
      setVisible(false)
    } catch (error) {
      // Handle any error that might occur during form submission
      console.error('Error submitting form:', error);
    }
  };


  // Event handler for updating form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for updating the 'attachFile' state when a file is selected
  const handleFileChange = (e) => {
    console.log('Selected file:', e.target.files[0]);
    setFormData({
      ...formData,
      attachFile: e.target.files[0],
    });
  };

  // const dispatch = useDispatch();

  //update data
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject({
      ...selectedProject,
      [name]: value,
    });
  };

  const handleUpdateFileChange = (e) => {
    console.log('Selected file:', e.target.files[0]);
    setSelectedProject({
      ...selectedProject,
      attachFile: e.target.files[0],
    });
  };


  const handleEditClick = (user) => {
    console.log(user._id)
    setSelectedProject({
      _id: user._id ,
    project_name: user.project_name,
    project_desc: user.project_desc,
    language: user.language,
    created_by: user.created_by,
    priority: user.priority,
    start_date: user.start_date,
    deadline: user.deadline,
    });
    console.log(selectedProject)


  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("data" , selectedProject)

    try {
      // Send the form data to the backend server using Axios
      const config = {
        headers: {
          'content-type': "multipart/form-data"
        }
      }
      await axios.put(`http://localhost:8000/api/update-project/${selectedProject._id}`, selectedProject, config);
      fetchData();
    } catch (error) {
      // Handle any error that might occur during form submission
      console.error('Error submitting form:', error);
    }
  };


  //delete data

  const handleDelete = async (projectId) => {
    try {
      // Send a DELETE request to the backend server to delete the project with the given ID
      // const response = await axios.delete(`http://localhost:5000/projectsdetails/${projectId}`);
      const response = await axios.get(`http://localhost:8000/api/delete-project/${projectId}`);

      // Optionally, handle the response from the server here (e.g., show a success message)
      console.log('Response from server:', response.data);

      // Refresh the data after successful deletion
      fetchData();
    } catch (error) {
      // Handle any error that might occur during the deletion process
      console.error('Error deleting project:', error);
    }
  };

  return (
    <>
      <CContainer fluid className="mt-5">
        <div className="d-flex bd-highlight flex-column flex-md-row mb-3">
          <div className="me-auto d-flex p-2 ">
            <CCol sm="auto">
              <CButton
                type="button"
                className='add-project-btn'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Add Project
              </CButton>
            </CCol>
            {/* <CCol sm="auto" className="mx-3">
              <CFormSelect className="project-select">
                <option>Week</option>
                <option value="1">Month</option>
                <option value="2">Year</option>
              </CFormSelect>
            </CCol> */}
          </div>

        </div>
        <div className="table-scroll">
          <div className="project-list-table-div">
            <div className="table-container">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                <CTable className="project-list-table mt-5">
                  <CTableHead>
                    <CTableRow className="project-list-table-header">
                      <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Description
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Language
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Created by
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Priority
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Start Date
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Deadline
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader" scope="col">
                        Documents
                      </CTableHeaderCell>
                      <CTableHeaderCell className="tableheader " scope="col">
                        Action
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {users.map((user) => (
                      <CTableRow className="project-list-table-body" key={user._id}>
                        <CTableDataCell className="tablecell pt-4">
                          {user.project_name}
                        </CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">
                          {user.project_desc}
                        </CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">{user.language}</CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">{user.created_by}</CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">{user.priority}</CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">{user.start_date}</CTableDataCell>
                        <CTableDataCell className="tablecell pt-4">{user.deadline}</CTableDataCell>
                        <CTableDataCell className="tablecell pt-4"><img src={`http://localhost:8000/project-image/${user.attachFile}`} style={{ height: "50px", width: "50px" }} /> </CTableDataCell>
                        <CTableDataCell className="tablecell pt-4 ">
                          <FontAwesomeIcon className='pe-4'
                            icon={faEye}
                            style={{ cursor: 'pointer', color: '#0f9299' }}
                          />
                          <FontAwesomeIcon
                            className="pe-4"
                            icon={faEdit}
                            style={{ cursor: 'pointer', color: '#0f9299' }}
                            data-bs-toggle="modal"
                            data-bs-target={`#editModal${user._id}`}
                            onClick={() => handleEditClick(user)} // Call handleEditClick with the current project data
                          />
                          <FontAwesomeIcon
                            className='pe-4'
                            icon={faTrash}
                            style={{ cursor: 'pointer', color: '#0f9299' }}
                            onClick={() => handleDelete(user._id)} // Call handleDelete with the project ID to be deleted
                          />
                        </CTableDataCell>
                        <div className="modal fade" id={`editModal${user._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header border-0 pb-0 px-4">
                                <h3 className="modal-title text-secondary" id="exampleModalLabel">
                                  <b> Edit Project</b>
                                </h3>
                                <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body px-5">
                                <form onSubmit={handleUpdate}>
                                <input type="hidden" name='id' value={selectedProject.id} />
                                  <div className="mb-4">
                                    <label htmlFor="project_name">Project Name</label>
                                    <input
                                      name='project_name'
                                      value={selectedProject.project_name}
                                      onChange={handleUpdateChange}
                                      type="text"
                                      className="form-control form-control-lg mt-2"
                                      id="project_name"
                                      required
                                    />
                                  </div>
                                  <div className="mt-3">
                                    <label htmlFor="project_desc">Project Description</label>
                                    <textarea
                                      name='project_desc'
                                      value={selectedProject.project_desc}
                                      onChange={handleUpdateChange}
                                      className="form-control form-control-lg mt-2"
                                      id="project_desc"
                                      required
                                      rows="5"
                                    />
                                  </div>
                                  <div className="row mt-3">
                                    <div className="form-group col-lg-6">
                                      <label htmlFor="language">Language</label>
                                      <select
                                        name='language'
                                        value={selectedProject.language}
                                        onChange={handleUpdateChange}
                                        className="form-control form-select form-control-lg mt-2"
                                        id="language"
                                        required
                                      >
                                        <option value="">Select Language</option>
                                        <option>React Js</option>
                                        <option>Node Js</option>
                                        <option>Mern Stack</option>
                                      </select>
                                    </div>
                                    <div className="form-group col-lg-6">
                                      <label htmlFor="created_by">Created by</label>
                                      <select
                                        name='created_by'
                                        value={selectedProject.created_by}
                                        onChange={handleUpdateChange}
                                        className="form-control form-select form-control-lg mt-2"
                                        id="created_by"
                                        required
                                      >
                                        <option value="">Created by</option>
                                        <option>Manager</option>
                                        <option>Team Leader</option>
                                        <option>P.O.</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="form-group col-lg-6">
                                      <label htmlFor="priority">Priority</label>
                                      <select
                                        name='priority'
                                        value={selectedProject.priority}
                                        onChange={handleUpdateChange}
                                        className="form-control form-select form-control-lg mt-2"
                                        id="priority"
                                        required
                                      >
                                        <option value="">Select Priority</option>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="form-group col-lg-6">
                                      <label htmlFor="start_date">Start Date</label>
                                      <input
                                        name='start_date'
                                        value={selectedProject.start_date}
                                        onChange={handleUpdateChange}
                                        type="date"
                                        className="form-control form-control-lg mt-2"
                                        id="start_date"
                                        required
                                      />
                                    </div>
                                    <div className="form-group col-lg-6">
                                      <label htmlFor="endDate">deadline</label>
                                      <input
                                        name='deadline'
                                        value={selectedProject.deadline}
                                        onChange={handleUpdateChange}
                                        type="date"
                                        className="form-control form-control-lg mt-2"
                                        id="deadline"
                                        required
                                      />
                                    </div>
                                  </div>
                                  {/* <div className="form-group mt-3">
                                    <label htmlFor="attachFile">Attach File</label>
                                    <input
                                      name="attachFile"
                                      onChange={handleUpdateFileChange}
                                      type="file"
                                      className="form-control form-control-lg mt-2"
                                      id="attachFile"
                                    />
                                  </div> */}
                                  <div className="modal-footer mb-3 border-0 text-center justify-content-center">
                                    <CButton type='submit' data-bs-dismiss="modal" className="edit-btn">Add</CButton>
                                    <CButton className="edit-btn" data-bs-dismiss="modal" onClick={() => setVisible(false)}>
                                      Close
                                    </CButton>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CTableRow>

                    ))}
                  </CTableBody>
                </CTable>
              )}






              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0 pb-0 px-4">
                      <h3 className="modal-title text-secondary" id="exampleModalLabel">
                        <b>Add New Project</b>
                      </h3>
                      <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-5">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="project_name">Project Name</label>
                          <input
                            name='project_name'
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-lg mt-2"
                            id="project_name"
                            required
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="project_desc">Project Description</label>
                          <textarea
                            name='project_desc'
                            onChange={handleChange}
                            className="form-control form-control-lg mt-2"
                            id="project_desc"
                            required
                            rows="5"
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="language">Language</label>
                            <select
                              name='language'
                              onChange={handleChange}
                              className="form-control form-select form-control-lg mt-2"
                              id="language"
                              required
                            >
                              <option value="">Select Language</option>
                              <option>React Js</option>
                              <option>Node Js</option>
                              <option>Mern Stack</option>
                            </select>
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="created_by">Created by</label>
                            <select
                              onChange={handleChange}
                              name='created_by'
                              className="form-control form-select form-control-lg mt-2"
                              id="created_by"
                              required
                            >
                              <option value="">Created by</option>
                              <option>Manager</option>
                              <option>Team Leader</option>
                              <option>P.O.</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="priority">Priority</label>
                            <select
                              name='priority'
                              onChange={handleChange}
                              className="form-control form-select form-control-lg mt-2"
                              id="priority"
                              required
                            >
                              <option value="">Select Priority</option>
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="start_date">Start Date</label>
                            <input
                              name='start_date'
                              onChange={handleChange}
                              type="date"
                              className="form-control form-control-lg mt-2"
                              id="start_date"
                              required
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="endDate">deadline</label>
                            <input
                              name='deadline'
                              onChange={handleChange}
                              type="date"
                              className="form-control form-control-lg mt-2"
                              id="deadline"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="attachFile">Attach File</label>
                          <input
                            name="attachFile"
                            onChange={handleFileChange}
                            type="file"
                            className="form-control form-control-lg mt-2"
                            id="attachFile"
                          />
                        </div>
                        <div className="modal-footer mb-3 border-0 text-center justify-content-center">
                          <CButton type='submit' data-bs-dismiss="modal" className="edit-btn">Add</CButton>
                          <CButton className="edit-btn" data-bs-dismiss="modal" onClick={() => setVisible(false)}>
                            Close
                          </CButton>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CContainer >
    </>
  )
}



export default userProject
