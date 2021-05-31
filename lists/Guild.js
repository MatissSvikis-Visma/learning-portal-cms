const { Text, Select, Relationship, Slug } = require('@keystonejs/fields');
const slugify = require('slugify');

const guildFields = {
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
        },
        body: {
            type: Text,
            isMultiline: true
        },
        links: {
            type: Relationship,
            ref: "Link",
            many: true
        }
    },
}
module.exports = guildFields;