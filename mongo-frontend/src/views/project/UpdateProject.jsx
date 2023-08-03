// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable prettier/prettier */

// import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'
// import '../../views/css/mansi.css'



// const UpdateProject = (props) => {

//     const [selectedProject, setSelectedProject] = useState({
//         id: props.id ,
//         project_name: props.project_name,
//         project_desc: props.project_desc,
//         language: props.language,
//         created_by: props.created_by,
//         priority: props.priority,
//         start_date: props.start_date,
//         deadline: props.deadline,
//         // attachFile: ''
//         // Add other project fields as needed
//     });

//     //update data
//     const handleUpdateChange = (e) => {
//         const { name, value } = e.target;
//         setSelectedProject({
//             ...selectedProject,
//             [name]: value,
//         });
//     };

//     const handleUpdateFileChange = (e) => {
//         console.log('Selected file:', e.target.files[0]);
//         setSelectedProject({
//             ...selectedProject,
//             attachFile: e.target.files[0],
//         });
//     };


//     const handleEditClick = (project) => {

//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         try {
//             // Send the form data to the backend server using Axios
//             const config = {
//                 headers: {
//                     'content-type': "multipart/form-data"
//                 }
//             }
//             const response = await axios.post(`http://localhost:8000/api/update-project/${selectedProject.id}`, selectedProject, config)
//             fetchData();
//         } catch (error) {
//             // Handle any error that might occur during form submission
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <>
//             <FontAwesomeIcon
//                 className="pe-4"
//                 icon={faEdit}
//                 style={{ cursor: 'pointer', color: '#0f9299' }}
//                 data-bs-toggle="modal"
//                 data-bs-target={`#editModal${user._id}`}
//                 onClick={() => handleEditClick(user._id)} // Call handleEditClick with the current project data
//             />
//             <div className="modal fade" id={`editModal${user._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-xl modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header border-0 pb-0 px-4">
//                             <h3 className="modal-title text-secondary" id="exampleModalLabel">
//                                 <b> Edit Project</b>
//                             </h3>
//                             <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body px-5">
//                             <form onSubmit={handleUpdate}>
//                                 <input type="hidden" name='id' value={user._id} />
//                                 <div className="mb-4">
//                                     <label htmlFor="project_name">Project Name</label>
//                                     <input
//                                         name='project_name'
//                                         value={user.project_name}
//                                         onChange={handleUpdateChange}
//                                         type="text"
//                                         className="form-control form-control-lg mt-2"
//                                         id="project_name"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="project_desc">Project Description</label>
//                                     <textarea
//                                         name='project_desc'
//                                         value={user.project_desc}
//                                         onChange={handleUpdateChange}
//                                         className="form-control form-control-lg mt-2"
//                                         id="project_desc"
//                                         required
//                                         rows="5"
//                                     />
//                                 </div>
//                                 <div className="row mt-3">
//                                     <div className="form-group col-lg-6">
//                                         <label htmlFor="language">Language</label>
//                                         <select
//                                             name='language'
//                                             value={user.language}
//                                             onChange={handleUpdateChange}
//                                             className="form-control form-select form-control-lg mt-2"
//                                             id="language"
//                                             required
//                                         >
//                                             <option value="">Select Language</option>
//                                             <option>React Js</option>
//                                             <option>Node Js</option>
//                                             <option>Mern Stack</option>
//                                         </select>
//                                     </div>
//                                     <div className="form-group col-lg-6">
//                                         <label htmlFor="created_by">Created by</label>
//                                         <select
//                                             name='created_by'
//                                             value={user.created_by}
//                                             onChange={handleUpdateChange}
//                                             className="form-control form-select form-control-lg mt-2"
//                                             id="created_by"
//                                             required
//                                         >
//                                             <option value="">Created by</option>
//                                             <option>Manager</option>
//                                             <option>Team Leader</option>
//                                             <option>P.O.</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-3">
//                                     <div className="form-group col-lg-6">
//                                         <label htmlFor="priority">Priority</label>
//                                         <select
//                                             name='priority'
//                                             value={user.priority}
//                                             onChange={handleUpdateChange}
//                                             className="form-control form-select form-control-lg mt-2"
//                                             id="priority"
//                                             required
//                                         >
//                                             <option value="">Select Priority</option>
//                                             <option>High</option>
//                                             <option>Medium</option>
//                                             <option>Low</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-3">
//                                     <div className="form-group col-lg-6">
//                                         <label htmlFor="start_date">Start Date</label>
//                                         <input
//                                             name='start_date'
//                                             value={user.start_date}
//                                             onChange={handleUpdateChange}
//                                             type="date"
//                                             className="form-control form-control-lg mt-2"
//                                             id="start_date"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group col-lg-6">
//                                         <label htmlFor="endDate">deadline</label>
//                                         <input
//                                             name='deadline'
//                                             value={user.deadline}
//                                             onChange={handleUpdateChange}
//                                             type="date"
//                                             className="form-control form-control-lg mt-2"
//                                             id="deadline"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* <div className="form-group mt-3">
//                                     <label htmlFor="attachFile">Attach File</label>
//                                     <input
//                                       name="attachFile"
//                                       onChange={handleUpdateFileChange}
//                                       type="file"
//                                       className="form-control form-control-lg mt-2"
//                                       id="attachFile"
//                                     />
//                                   </div> */}
//                                 <div className="modal-footer mb-3 border-0 text-center justify-content-center">
//                                     <CButton type='submit' data-bs-dismiss="modal" className="edit-btn">Add</CButton>
//                                     <CButton className="edit-btn" data-bs-dismiss="modal" onClick={() => setVisible(false)}>
//                                         Close
//                                     </CButton>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default UpdateProject
