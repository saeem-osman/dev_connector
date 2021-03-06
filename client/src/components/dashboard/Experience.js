import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
onClickDelete = (id) =>{
    this.props.deleteExperience(id);
}
  render() {
      const experience = this.props.experience.map(exp =>(
          <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>{exp.location}</td>
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
          <h4 className="mb-4">Experience Credentials</h4>
          <table className="table">
              <thead>
                  <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Years</th>
                      <th></th>
                  </tr>
                      {experience}
              </thead>
          </table>
      </div>
    );
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
