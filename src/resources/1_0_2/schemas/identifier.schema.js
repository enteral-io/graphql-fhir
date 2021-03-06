const {
	GraphQLList,
	GraphQLString,
	GraphQLUnionType,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');

/**
 * @name exports
 * @summary Identifier Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Identifier',
	description: 'Base StructureDefinition for Identifier Type',
	fields: () => ({
		_id: {
			type: require('./element.schema.js'),
			description:
				'unique id for the element within a resource (for internal references).',
		},
		id: {
			type: IdScalar,
			description:
				'unique id for the element within a resource (for internal references).',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		_use: {
			type: require('./element.schema.js'),
			description: 'The purpose of this identifier.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/identifier-use
		use: {
			type: CodeScalar,
			description: 'The purpose of this identifier.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/identifier-type
		type: {
			type: require('./codeableconcept.schema.js'),
			description:
				'A coded type for the identifier that can be used to determine which identifier to use for a specific purpose.',
		},
		_system: {
			type: require('./element.schema.js'),
			description:
				'Establishes the namespace in which set of possible id values is unique.',
		},
		system: {
			type: UriScalar,
			description:
				'Establishes the namespace in which set of possible id values is unique.',
		},
		_value: {
			type: require('./element.schema.js'),
			description:
				'The portion of the identifier typically displayed to the user and which is unique within the context of the system.',
		},
		value: {
			type: GraphQLString,
			description:
				'The portion of the identifier typically displayed to the user and which is unique within the context of the system.',
		},
		period: {
			type: require('./period.schema.js'),
			description: 'Time period during which identifier is/was valid for use.',
		},
		assigner: {
			type: new GraphQLUnionType({
				name: 'Identifierassigner_assigner_Union',
				description: 'Organization that issued/manages the identifier.',
				types: () => [require('./organization.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
				},
			}),
			description: 'Organization that issued/manages the identifier.',
		},
	}),
});
