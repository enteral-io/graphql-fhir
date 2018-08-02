const CodeScalar = require('../scalars/code.scalar');
const { GraphQLObjectType } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary ExpansionProfileDesignationIncludeDesignation Schema
 */
module.exports = new GraphQLObjectType({
	name: 'ExpansionProfileDesignationIncludeDesignation',
	description: 'A data group for each designation to be included.',
	fields: () => extendSchema(require('./backboneelement.schema'), {
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/languages
		language: {
			type: CodeScalar,
			description: 'The language this designation is defined for.'
		},
		_language: {
			type: require('./element.schema'),
			description: 'The language this designation is defined for.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/designation-use
		use: {
			type: require('./coding.schema'),
			description: 'Which kinds of designation to include in the expansion.'
		}
	})
});
