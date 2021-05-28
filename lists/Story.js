const { Text, Select, Relationship } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const storyFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        body: {
            type: Wysiwyg,
            isMultiline: true
        },
        status: {
            type: Select,
            options: [
                { value: "PUBLISHED", label: "Published" },
                { value: "UNPUBLISHED", label: "Unpublished" }
            ]
        },
        author: {
            type: Text,
            ref: "KeystoneUser",
            many: false,
            isRequired: true
        }
    }
}
module.exports = storyFields;