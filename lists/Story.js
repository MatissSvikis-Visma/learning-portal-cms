const { Text, Select, Relationship, Slug, Checkbox } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const storyFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        slug: {
            type: Slug,
            adminConfig: {
                isReadOnly: true, //slug can be created automatically and you may want to show this as read only
            },
            unique: true
        },
        body: {
            type: Wysiwyg,
            isMultiline: true
        },
        excerpt: {
            type: Text
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
            many: false,
            isRequired: true
        },
        isFeatured: {
            type: Checkbox,
            isRequired: true
        }
    },
}
module.exports = storyFields;