const { Text, Select, Relationship } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');


const roleFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        body: {
            type: Wysiwyg,
            isMultiline: true
        },
    }
}
module.exports = roleFields;