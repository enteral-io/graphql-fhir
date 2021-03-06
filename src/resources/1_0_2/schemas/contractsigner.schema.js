const {
	GraphQLList,
	GraphQLNonNull,
	GraphQLUnionType,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');

/**
 * @name exports
 * @summary Contractsigner Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Contractsigner',
	description: '',
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
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/contract-signer-type
		type: {
			type: new GraphQLNonNull(require('./coding.schema.js')),
			description: 'Role of this Contract signer, e.g. notary, grantee.',
		},
		party: {
			type: new GraphQLNonNull(
				new GraphQLUnionType({
					name: 'Contractsignerparty_party_Union',
					description: 'Party which is a signator to this Contract.',
					types: () => [
						require('./organization.schema.js'),
						require('./patient.schema.js'),
						require('./practitioner.schema.js'),
						require('./relatedperson.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Organization') {
							return require('./organization.schema.js');
						}
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'Practitioner') {
							return require('./practitioner.schema.js');
						}
						if (data && data.resourceType === 'RelatedPerson') {
							return require('./relatedperson.schema.js');
						}
					},
				}),
			),
			description: 'Party which is a signator to this Contract.',
		},
		_signature: {
			type: require('./element.schema.js'),
			description:
				'Legally binding Contract DSIG signature contents in Base64.',
		},
		signature: {
			type: new GraphQLNonNull(GraphQLString),
			description:
				'Legally binding Contract DSIG signature contents in Base64.',
		},
	}),
});
