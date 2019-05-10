import React from 'react'
import PropTypes from 'prop-types';
import classname from 'classnames';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
    <div className="form-group">
      <input type={type} className={classname('form-control form-control-lg', {
          'is-invalid': error
      })} placeholder={placeholder} name={name} value={value}
      onChange={onChange}
      />
      {info && (<div classname="form-text text-muted">{info}</div>)}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

TextFieldGroup.propTypes = ({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.isRequired

})

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup