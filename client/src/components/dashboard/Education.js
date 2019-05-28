import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
onClickDelete = (id) =>{
    this.props.deleteEducation(id);
}
  render() {
      const education = this.props.education.map(exp =>(
          <tr key={exp._id}>
              <td>{exp.school}</td>
              <td>{exp.degree}</td>
              <td>{exp.major}</td>
              <td>
              <Moment format="YYYY/MM/DD" date={exp.from} /> - {exp.to === null ? ' Now ': (
                  <Moment format="YYYY/MM/DD" date={exp.to} />
              )}
              </td>
              <td><button onClick={() =>this.onClickDelete(exp._id)} className="btn btn-danger">Delete</button></td>

          </tr>
      ))
    return (
      <div>
          <h4 className="mb-4">Education Credentials</h4>
          <table className="table">
              <thead>
                  <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Major</th>
                      <th>Years</th>
                      <th></th>
                  </tr>
                      {education}
              </thead>
          </table>
      </div>
    );
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
