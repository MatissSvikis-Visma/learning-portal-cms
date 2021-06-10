const { Text, Select, Relationship, Slug } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');


const roleFields = {
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
        discipline: {
            type: Relationship,
            ref: "Discipline",
            many: true
        },
        tags: {
            type: Relationship,
            ref: "Tag",
            many: true
        },
        linksTo: {
            type: Relationship,
            ref: "Role",
            many: true,
        },
        row: {
            type: Select,
            options: [
                { value: 1, label: 'one' },
                { value: 2, label: 'two' },
                { value: 3, label: 'three' },
                { value: 4, label: 'four' }
            ],
            dataType: 'integer'
        },
        column: {
            type: Select,
            options: [
                { value: 1, label: 'one' },
                { value: 2, label: 'two' },
                { value: 3, label: 'three' },
                { value: 4, label: 'four' },
                { value: 5, label: 'five' }
            ],
            dataType: 'integer'
        }
    },
}
module.exports = roleFields;