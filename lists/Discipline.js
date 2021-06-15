const { Text, Select, Relationship, Slug } = require('@keystonejs/fields');
const slugify = require('slugify');

const disciplineFields = {
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
            type: Text,
            isMultiline: true
        },
        category: {
            type: Relationship,
            ref: "Category",
            isRequired: true,
            many: false
        },
        contacts: {
            type: Relationship,
            ref: "User",
            many: true
        },
        relatedCareerOptions: {
            type: Relationship,
            ref: "Role",
            many: true
        },
        guilds: {
            type: Relationship,
            ref: "Guild",
            many: true
        },
        specializations: {
            type: Text
        },
        status: {
            type: Select,
            options: [
                { value: "PUBLISHED", label: "Published" },
                { value: "UNPUBLISHED", label: "Unpublished" }
            ]
        },
    },
}
module.exports = disciplineFields;