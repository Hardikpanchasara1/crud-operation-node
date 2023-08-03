/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */


import React, { useState, useEffect } from 'react'
import { PageItem, Pagination } from 'react-bootstrap'
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
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../../views/css/mansi.css'
import data from './Data.jsx'

const MyTask = () => {
  const [visible, setVisible] = useState(false)
  const [visibleaddpro, setVisibleaddpro] = useState(false)
  // const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleChange = () => {

  }

  // Fetch your table data from an API or other source
  //   useEffect(() => {
  //     fetchData() // Implement your data fetching logic here
  //   }, [])

  // Filter the data based on the filter value
  // const filteredData = data.filter((row) => row.value.toString().includes(filter))
  const filteredData = data
    .filter((row) => row.Title.toString().includes(filter))
    .slice(0, itemsPerPage * currentPage)

  // Update pagination when filter or data changes
  useEffect(() => {
    setCurrentPage(1)
    setItemsPerPage(10) // Set the default number of items per page when the filter changes
  }, [filter])

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Handle filter value change
  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value)
  // }
  const handleFilterChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  return (
    <CContainer fluid className="mt-5">
      <div className="d-flex bd-highlight flex-column flex-sm-row mb-3">
        <div className="me-auto d-flex p-2 align-items-center">
          <CCol sm="auto" >
            <CButton onClick={() => setVisibleaddpro(!visibleaddpro)}
              type="button"
              className='add-project-btn'
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              Add New Task
            </CButton>
          </CCol>
          {/* <span>show</span>
          <CCol sm="auto" className="px-3">
            <CFormSelect
              className="project-select"
              value={itemsPerPage}
              onChange={handleFilterChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </CFormSelect>
          </CCol>
          <span>entries</span> */}
        </div>
        <div className="p-2 ">
          <div className="row  d-flex   align-items-center">
            <div className="col-md-6 d-flex">
              <div className="project-search-bar">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control searchbar-input"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-scroll">
        <div className="project-list-table-div">
          <div className="table-container">
            <CTable className="project-list-table mt-5">
              <CTableHead>
                <CTableRow className="project-list-table-header">
                  <CTableHeaderCell className="tableheader " scope="col">
                    Title
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell> */}
                  <CTableHeaderCell className="tableheader" scope="col">
                    Project
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Created
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Assigned
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Priority
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell>
                  <CTableHeaderCell className="tableheader text-center" scope="col">
                    Action
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, ind) => (
                  <CTableRow className="project-list-table-body" key={ind}>
                    <CTableDataCell className="tablecell pt-4">{row.Title}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">{row.Project}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">{row.Created}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">{row.Assigned}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">{row.Status}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">{row.Priority}</CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">
                      <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer', color: '#0f9299' }} />
                    </CTableDataCell>
                    <CTableDataCell className="tablecell text-center pt-4">
                      <FontAwesomeIcon
                        onClick={() => setVisible(!visible)}
                        icon={faEdit}
                        style={{ cursor: 'pointer', color: '#0f9299' }}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="tablecell pt-4">
                      <FontAwesomeIcon

                        icon={faTrash}
                        style={{ cursor: 'pointer', color: '#0f9299' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
              onPageChange={(page) => setCurrentPage(page)}
            /> */}

            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map(
                (_, index) => (
                  <PageItem
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PageItem>
                ),
              )}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(Math.ceil(filteredData.length / itemsPerPage))}
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              />
            </Pagination>



            <CModal
              alignment="center"
              className="edit-modal"
              scrollable
              visible={visible}
              onClose={() => setVisible(false)}
            >
              <CModalHeader>
                <CModalTitle className='px-3 fs-2'  >Edit Project</CModalTitle>
              </CModalHeader>
              <CModalBody className='px-5'>
                <div className="row edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Name" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Description" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Manager" />
                </div>
                <div className="row mt-3">
                  <div>
                    <p>Team Members</p>
                  </div>
                  <div className="col-6 edit-checkbox">
                    <CFormCheck
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      label="Add All Team Members"
                    />
                  </div>
                  <div className="col-6 edit-checkbox">
                    <CFormCheck
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      label="Select Specific Team Members"
                    />
                  </div>
                </div>
                {/* <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Client" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput
                    className="edit-input"
                    type="text"
                    label="Co-Client"
                    style={{ width: '300px' }}
                  />
                </div> */}
              </CModalBody>
              <CModalFooter className='d-flex justify-content-center'>
                <CButton className="edit-btn">Update</CButton>
                <CButton className="edit-btn" onClick={() => setVisible(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>



            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0 px-4">
                    <h3 className="modal-title text-secondary" id="exampleModalLabel">
                      <b>Add New Task</b>
                    </h3>
                    <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body px-5">
                    <form>
                      <div className="mb-4">
                        <label htmlFor="projectName">Task Name</label>
                        <input type="text" className="form-control form-control-lg mt-2" id="projectName" required />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="projectDescription">Task Description</label>
                        <input type="text" className="form-control  form-control-lg mt-2" id="projectDescription" required />
                      </div>

                      <div className="row mt-3">
                        <div className="form-group col-lg-6">
                          <label htmlFor="projectLanguage">Language</label>
                          <select className="form-control form-select form-control-lg mt-2" id="projectLanguage" required>
                            <option value="">Select Language</option>
                            <option>React Js</option>
                            <option>Node Js</option>
                            <option>Mern Stack</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-6">
                          <label htmlFor="projectCategory">Created by</label>
                          <select className="form-control form-select form-control-lg mt-2" id="projectCategory" required>
                            <option value="">Created by</option>
                            <option>React Js</option>
                            <option>Node Js</option>
                            <option>Mern Stack</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label htmlFor="referenceLink">Reference Link</label>
                        <input type="text" className="form-control form-control-lg mt-2" id="referenceLink" required />
                      </div>

                      <div className="row mt-3">
                        <div className="form-group col-lg-6">
                          <label htmlFor="projectPriority">Priority</label>
                          <select className="form-control form-select form-control-lg mt-2" id="projectPriority" required>
                            <option value="">Select Priority</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-6">
                          <label htmlFor="projectCategoryBy">Member</label>
                          <select className="form-control form-select form-control-lg mt-2" id="projectCategoryBy" required>
                            <option value="">Select Member  </option>
                            <option>React Js</option>
                            <option>Node Js</option>
                            <option>Mern Stack</option>
                          </select>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="attachFile">Attach File</label>
                          <input type="file" className="form-control form-control-lg mt-2" id="attachFile" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer mb-3 border-0 text-center justify-content-center">
                    <CButton className="edit-btn">Add</CButton>
                    <CButton className="edit-btn" data-bs-dismiss="modal" onClick={() => setVisible(false)}>
                      Close
                    </CButton>
                  </div>
                </div>
              </div>
            </div>




          </div>

        </div>
      </div>
    </CContainer>
  )
}


export default MyTask
