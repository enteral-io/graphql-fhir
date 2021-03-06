const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');

/**
 * @name exports
 * @summary Account Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Account',
	description:
		'A financial tool for tracking value accrued for a particular purpose.  In the healthcare field, used to track charges for a patient, cost centers, etc.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Account_Enum_schema',
					values: { Account: { value: 'Account' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.schema.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.schema.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'Unique identifier used to reference the account.  Might or might not be intended for human use (e.g. credit card number).',
		},
		_status: {
			type: require('./element.schema.js'),
			description:
				'Indicates whether the account is presently used/usable or not.',
		},
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Indicates whether the account is presently used/usable or not.',
		},
		type: {
			type: require('./codeableconcept.schema.js'),
			description:
				'Categorizes the account for reporting and searching purposes.',
		},
		_name: {
			type: require('./element.schema.js'),
			description:
				'Name used for the account when displaying it to humans in reports, etc.',
		},
		name: {
			type: GraphQLString,
			description:
				'Name used for the account when displaying it to humans in reports, etc.',
		},
		subject: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'Accountsubject_subject_Union',
					description:
						'Identifies the entity which incurs the expenses. While the immediate recipients of services or goods might be entities related to the subject, the expenses were ultimately incurred by the subject of the Account.',
					types: () => [
						require('./patient.schema.js'),
						require('./device.schema.js'),
						require('./practitioner.schema.js'),
						require('./practitionerrole.schema.js'),
						require('./location.schema.js'),
						require('./healthcareservice.schema.js'),
						require('./organization.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'Device') {
							return require('./device.schema.js');
						}
						if (data && data.resourceType === 'Practitioner') {
							return require('./practitioner.schema.js');
						}
						if (data && data.resourceType === 'PractitionerRole') {
							return require('./practitionerrole.schema.js');
						}
						if (data && data.resourceType === 'Location') {
							return require('./location.schema.js');
						}
						if (data && data.resourceType === 'HealthcareService') {
							return require('./healthcareservice.schema.js');
						}
						if (data && data.resourceType === 'Organization') {
							return require('./organization.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies the entity which incurs the expenses. While the immediate recipients of services or goods might be entities related to the subject, the expenses were ultimately incurred by the subject of the Account.',
		},
		servicePeriod: {
			type: require('./period.schema.js'),
			description: 'The date range of services associated with this account.',
		},
		coverage: {
			type: new GraphQLList(require('./accountcoverage.schema.js')),
			description:
				'The party(s) that are responsible for covering the payment of this account, and what order should they be applied to the account.',
		},
		owner: {
			type: new GraphQLUnionType({
				name: 'Accountowner_owner_Union',
				description:
					'Indicates the service area, hospital, department, etc. with responsibility for managing the Account.',
				types: () => [require('./organization.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
				},
			}),
			description:
				'Indicates the service area, hospital, department, etc. with responsibility for managing the Account.',
		},
		_description: {
			type: require('./element.schema.js'),
			description:
				'Provides additional information about what the account tracks and how it is used.',
		},
		description: {
			type: GraphQLString,
			description:
				'Provides additional information about what the account tracks and how it is used.',
		},
		guarantor: {
			type: new GraphQLList(require('./accountguarantor.schema.js')),
			description:
				'The parties responsible for balancing the account if other payment options fall short.',
		},
		partOf: {
			type: new GraphQLUnionType({
				name: 'AccountpartOf_partOf_Union',
				description: 'Reference to a parent Account.',
				types: () => [require('./account.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Account') {
						return require('./account.schema.js');
					}
				},
			}),
			description: 'Reference to a parent Account.',
		},
	}),
});
