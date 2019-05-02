const Validator = require('validator');
const isEmpty  = require('./isEmpty');
module.exports = validateCommentInput = (data) => {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text is required';
    }
    if(!Validator.isLength(data.text, {min: 5, max: 500})){
        errors.text = 'Comment must be in between 2 and 500 characters.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}