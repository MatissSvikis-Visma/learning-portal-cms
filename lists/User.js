const { Text, Select, Relationship } = require('@keystonejs/fields');

const userFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        email: {
            type: Text,
            isRequired: true
        }
    }
}
module.exports = userFields;