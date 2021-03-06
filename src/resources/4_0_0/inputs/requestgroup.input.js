const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLString,
	GraphQLInputObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const CanonicalScalar = require('../scalars/canonical.scalar.js');
const DateTimeScalar = require('../scalars/datetime.scalar.js');

/**
 * @name exports
 * @summary RequestGroup Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'RequestGroup_Input',
	description:
		"A group of related requests that can be used to capture intended activities that have inter-dependencies such as 'give this medication after that one'.",
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'RequestGroup_Enum_input',
					values: { RequestGroup: { value: 'RequestGroup' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.input.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.input.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.input.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.input.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.input.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(GraphQLString),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input.js')),
			description:
				'Allows a service to provide a unique, business identifier for the request.',
		},
		_instantiatesCanonical: {
			type: require('./element.input.js'),
			description:
				'A canonical URL referencing a FHIR-defined protocol, guideline, orderset or other definition that is adhered to in whole or in part by this request.',
		},
		instantiatesCanonical: {
			type: new GraphQLList(CanonicalScalar),
			description:
				'A canonical URL referencing a FHIR-defined protocol, guideline, orderset or other definition that is adhered to in whole or in part by this request.',
		},
		_instantiatesUri: {
			type: require('./element.input.js'),
			description:
				'A URL referencing an externally defined protocol, guideline, orderset or other definition that is adhered to in whole or in part by this request.',
		},
		instantiatesUri: {
			type: new GraphQLList(UriScalar),
			description:
				'A URL referencing an externally defined protocol, guideline, orderset or other definition that is adhered to in whole or in part by this request.',
		},
		basedOn: {
			type: new GraphQLList(GraphQLString),
			description:
				'A plan, proposal or order that is fulfilled in whole or in part by this request.',
		},
		replaces: {
			type: new GraphQLList(GraphQLString),
			description:
				'Completed or terminated request(s) whose function is taken by this new request.',
		},
		groupIdentifier: {
			type: require('./identifier.input.js'),
			description:
				'A shared identifier common to all requests that were authorized more or less simultaneously by a single author, representing the identifier of the requisition, prescription or similar form.',
		},
		_status: {
			type: require('./element.input.js'),
			description:
				'The current state of the request. For request groups, the status reflects the status of all the requests in the group.',
		},
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'The current state of the request. For request groups, the status reflects the status of all the requests in the group.',
		},
		_intent: {
			type: require('./element.input.js'),
			description:
				'Indicates the level of authority/intentionality associated with the request and where the request fits into the workflow chain.',
		},
		intent: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Indicates the level of authority/intentionality associated with the request and where the request fits into the workflow chain.',
		},
		_priority: {
			type: require('./element.input.js'),
			description:
				'Indicates how quickly the request should be addressed with respect to other requests.',
		},
		priority: {
			type: CodeScalar,
			description:
				'Indicates how quickly the request should be addressed with respect to other requests.',
		},
		code: {
			type: require('./codeableconcept.input.js'),
			description: 'A code that identifies what the overall request group is.',
		},
		subject: {
			type: GraphQLString,
			description: 'The subject for which the request group was created.',
		},
		encounter: {
			type: GraphQLString,
			description: 'Describes the context of the request group, if any.',
		},
		_authoredOn: {
			type: require('./element.input.js'),
			description: 'Indicates when the request group was created.',
		},
		authoredOn: {
			type: DateTimeScalar,
			description: 'Indicates when the request group was created.',
		},
		author: {
			type: GraphQLString,
			description: 'Provides a reference to the author of the request group.',
		},
		reasonCode: {
			type: new GraphQLList(require('./codeableconcept.input.js')),
			description:
				'Describes the reason for the request group in coded or textual form.',
		},
		reasonReference: {
			type: new GraphQLList(GraphQLString),
			description:
				'Indicates another resource whose existence justifies this request group.',
		},
		note: {
			type: new GraphQLList(require('./annotation.input.js')),
			description:
				'Provides a mechanism to communicate additional information about the response.',
		},
		action: {
			type: new GraphQLList(require('./requestgroupaction.input.js')),
			description:
				'The actions, if any, produced by the evaluation of the artifact.',
		},
	}),
});
