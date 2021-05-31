const { Text, Select, Relationship, Slug } = require('@keystonejs/fields');
const slugify = require('slugify');

const linkFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        body: {
            type: Text,
            isMultiline: true
        },
        link: {
            type: Text,
        }
    },
}
module.exports = linkFields;