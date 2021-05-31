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
        discipline: {
            type: Relationship,
            ref: "Discipline",
            many: false
        },
        tags: {
            type: Relationship,
            ref: "Tag",
            many: true
        },
    },
}
module.exports = roleFields;