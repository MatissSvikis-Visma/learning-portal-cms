const { Text, Select, Relationship } = require('@keystonejs/fields');

const categoryFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        body: {
            type: Text,
            isMultiline: true
        },
    },
}
module.exports = categoryFields;