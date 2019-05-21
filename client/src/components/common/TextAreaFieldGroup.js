import React from 'react'
import PropTypes from 'prop-types';
import classname from 'classnames';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
  return (
    <div className="form-group">
      <textarea  className={classname('form-control form-control-lg', {
          'is-invalid': error
      })} placeholder={placeholder} name={name} value={value}
      onChange={onChange}
      />
      {info && (<div classname="form-text text-muted">{info}</div>)}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

TextAreaFieldGroup.propTypes = ({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,

})


export default TextAreaFieldGroup