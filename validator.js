/*
 * Name : Vue Validator
 * Author : Tawanda Nyakudjga
 * Date : November 2016
 * Description : A bootsrap and jquery form validation library
 **/

var $ = require('jquery');

var vd = module.exports = {
    addError: (field) => {
        $(field).closest('.form-group').addClass('has-error');
        $(field).focus();
        $(field).select();
    },

    removeError: (field) => {
        $(field).closest('.form-group').removeClass('has-error');
    },

    isNotEmpty: (field) => {
        var inputStr = $(field).val();
        $(field).closest('.form-group').removeClass('has-error');
        if (inputStr == "" || inputStr == null) {
            vd.addError(field);
            vd.errors.push("required field");
            return false;
        }
        return true;

    },
    isNumber: (field) => {
        if (isNotEmpty(field)) {
            var inputStr = field.value;
            vd.removeError(field);
            for (var i = 0; i < inputStr.length; i++) {
                var oneChar = inputStr.substring(i, i + 1);
                if (oneChar < "0" || oneChar > "9") {
                    vd.addError(field);
                    vd.errors.push("a number is required");
                    return false;
                }
            }
            if (field.value.length < 9) {
                vd.addError(field);
                vd.errors.push("a number is required");
                return false;
            }
            return true;
        }
        return false;
    },

    validate: (form) => {
        vd.errors = [];
        vd.isValid = true;
        var fields = $(form).find(':input');
        $.each(fields, function(i, field) {
            $(field).tooltip("destroy");
            if ($(field).attr('required') == 'required' || $(field).attr('required') == 'true') {
                if (!vd.isNotEmpty(field)) {
                    vd.isValid = false;
                    $(field).tooltip()
                        .attr("data-original-title", "field is required")
                }
            }

            if ($(field).attr('number')) {
                if (!vd.isNumber(field)) {
                    vd.isValid = false;
                }
            }
        });
        return vd;
    },
    errors: Array(),
    isValid: true
}
exports.formValidate = vd;
