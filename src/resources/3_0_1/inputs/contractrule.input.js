const { GraphQLInputObjectType, GraphQLNonNull } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary ContractRule Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ContractRule_Input',
	description: 'List of Computable Policy Rule Language Representations of this Contract.',
	fields: () => extendSchema(require('./backboneelement.input'), {
		contentAttachment: {
			type: new GraphQLNonNull(require('./attachment.input')),
			description: 'Computable Contract conveyed using a policy rule language (e.g. XACML, DKAL, SecPal).'
		},
		contentReference: {
			type: new GraphQLNonNull(require('./reference.input')),
			description: 'Computable Contract conveyed using a policy rule language (e.g. XACML, DKAL, SecPal).'
		}
	})
});
