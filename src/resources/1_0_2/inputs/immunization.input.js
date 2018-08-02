const CodeScalar = require('../scalars/code.scalar');
const DateTimeScalar = require('../scalars/datetime.scalar');
const DateScalar = require('../scalars/date.scalar');
const { GraphQLInputObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

// TODO: Verify this is the correct resourceType
let ImmunizationResourceInputType = new GraphQLEnumType({
	name: 'ImmunizationResourceInputType',
	values: {
		Immunization: { value: 'Immunization' }
	}
});

/**
 * @name exports
 * @summary Immunization Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'Immunization_Input',
	description: 'Base StructureDefinition for Immunization Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		resourceType: {
			type: new GraphQLNonNull(ImmunizationResourceInputType),
			description: 'Type of this resource'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input')),
			description: 'A unique identifier assigned to this immunization record.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/medication-admin-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'Indicates the current status of the vaccination event.'
		},
		_status: {
			type: require('./element.input'),
			description: 'Indicates the current status of the vaccination event.'
		},
		date: {
			type: DateTimeScalar,
			description: 'Date vaccine administered or was to be administered.'
		},
		_date: {
			type: require('./element.input'),
			description: 'Date vaccine administered or was to be administered.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/vaccine-code
		vaccineCode: {
			type: new GraphQLNonNull(require('./codeableconcept.input')),
			description: 'Vaccine that was administered or was to be administered.'
		},
		patient: {
			type: new GraphQLNonNull(require('./reference.input')),
			description: 'The patient who either received or did not receive the immunization.'
		},
		wasNotGiven: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'Indicates if the vaccination was or was not given.'
		},
		_wasNotGiven: {
			type: require('./element.input'),
			description: 'Indicates if the vaccination was or was not given.'
		},
		reported: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'True if this administration was reported rather than directly administered.'
		},
		_reported: {
			type: require('./element.input'),
			description: 'True if this administration was reported rather than directly administered.'
		},
		performer: {
			type: require('./reference.input'),
			description: 'Clinician who administered the vaccine.'
		},
		requester: {
			type: require('./reference.input'),
			description: 'Clinician who ordered the vaccination.'
		},
		encounter: {
			type: require('./reference.input'),
			description: 'The visit or admission or other contact between patient and health care provider the immunization was performed as part of.'
		},
		manufacturer: {
			type: require('./reference.input'),
			description: 'Name of vaccine manufacturer.'
		},
		location: {
			type: require('./reference.input'),
			description: 'The service delivery location where the vaccine administration occurred.'
		},
		lotNumber: {
			type: GraphQLString,
			description: 'Lot number of the  vaccine product.'
		},
		_lotNumber: {
			type: require('./element.input'),
			description: 'Lot number of the  vaccine product.'
		},
		expirationDate: {
			type: DateScalar,
			description: 'Date vaccine batch expires.'
		},
		_expirationDate: {
			type: require('./element.input'),
			description: 'Date vaccine batch expires.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/immunization-site
		site: {
			type: require('./codeableconcept.input'),
			description: 'Body site where vaccine was administered.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/immunization-route
		route: {
			type: require('./codeableconcept.input'),
			description: 'The path by which the vaccine product is taken into the body.'
		},
		doseQuantity: {
			type: require('./quantity.input'),
			description: 'The quantity of vaccine product that was administered.'
		},
		note: {
			type: new GraphQLList(require('./annotation.input')),
			description: 'Extra information about the immunization that is not conveyed by the other attributes.'
		},
		explanation: {
			type: require('./immunizationexplanation.input'),
			description: 'Reasons why a vaccine was or was not administered.'
		},
		reaction: {
			type: new GraphQLList(require('./immunizationreaction.input')),
			description: 'Categorical data indicating that an adverse event is associated in time to an immunization.'
		},
		vaccinationProtocol: {
			type: new GraphQLList(require('./immunizationvaccinationprotocol.input')),
			description: 'Contains information about the protocol(s) under which the vaccine was administered.'
		}
	})
});
