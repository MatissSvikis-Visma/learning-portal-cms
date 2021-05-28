const { Text, Select, Relationship } = require('@keystonejs/fields');

const disciplineFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        body: {
            type: Text,
            isMultiline: true
        },
        category: {
            type: Relationship,
            ref: "Category",
            isRequired: true
        },
    }
}
module.exports = disciplineFields;