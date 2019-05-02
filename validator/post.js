const Validator = require('validator');
const isEmpty  = require('./isEmpty');
module.exports = validatePostInput = (data) => {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text is required';
    }
    if(!Validator.isLength(data.text, {min: 5, max: 500})){
        errors.text = 'Text must be in between 5 and 500 characters.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}