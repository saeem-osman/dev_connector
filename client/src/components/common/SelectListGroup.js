import React from 'react'
import PropTypes from 'prop-types';
import classname from 'classnames';

const SelectListGroup = ({
    name,
    value,
    label,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => {
        return(
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        )
    })
  return (
    <div className="form-group">
      <select  className={classname('form-control form-control-lg', {
          'is-invalid': error
      })}  name={name} value={value}
      onChange={onChange}
      >
          {selectOptions}
      </select>
      {info && (<div classname="form-text text-muted">{info}</div>)}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

SelectListGroup.propTypes = ({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired

})


export default SelectListGroup