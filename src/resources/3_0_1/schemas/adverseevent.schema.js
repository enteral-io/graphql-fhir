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
const DateTimeScalar = require('../scalars/datetime.scalar.js');

/**
 * @name exports
 * @summary AdverseEvent Schema
 */
module.exports = new GraphQLObjectType({
	name: 'AdverseEvent',
	description: 'Base StructureDefinition for AdverseEvent Resource',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'AdverseEvent_Enum_schema',
					values: { AdverseEvent: { value: 'AdverseEvent' } },
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
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content may not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/languages
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource, and may be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		identifier: {
			type: require('./identifier.schema.js'),
			description:
				'The identifier(s) of this adverse event that are assigned by business processes and/or used to refer to it when a direct URL reference to the resource itsefl is not appropriate.',
		},
		_category: {
			type: require('./element.schema.js'),
			description:
				'The type of event which is important to characterize what occurred and caused harm to the subject, or had the potential to cause harm to the subject.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/adverse-event-category
		category: {
			type: CodeScalar,
			description:
				'The type of event which is important to characterize what occurred and caused harm to the subject, or had the potential to cause harm to the subject.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/adverse-event-type
		type: {
			type: require('./codeableconcept.schema.js'),
			description:
				'This element defines the specific type of event that occurred or that was prevented from occurring.',
		},
		subject: {
			type: new GraphQLUnionType({
				name: 'AdverseEventsubject_subject_Union',
				description:
					'This subject or group impacted by the event.  With a prospective adverse event, there will be no subject as the adverse event was prevented.',
				types: () => [
					require('./patient.schema.js'),
					require('./researchsubject.schema.js'),
					require('./medication.schema.js'),
					require('./device.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Patient') {
						return require('./patient.schema.js');
					}
					if (data && data.resourceType === 'ResearchSubject') {
						return require('./researchsubject.schema.js');
					}
					if (data && data.resourceType === 'Medication') {
						return require('./medication.schema.js');
					}
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
				},
			}),
			description:
				'This subject or group impacted by the event.  With a prospective adverse event, there will be no subject as the adverse event was prevented.',
		},
		_date: {
			type: require('./element.schema.js'),
			description:
				'The date (and perhaps time) when the adverse event occurred.',
		},
		date: {
			type: DateTimeScalar,
			description:
				'The date (and perhaps time) when the adverse event occurred.',
		},
		reaction: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'AdverseEventreaction_reaction_Union',
					description:
						'Includes information about the reaction that occurred as a result of exposure to a substance (for example, a drug or a chemical).',
					types: () => [require('./condition.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Condition') {
							return require('./condition.schema.js');
						}
					},
				}),
			),
			description:
				'Includes information about the reaction that occurred as a result of exposure to a substance (for example, a drug or a chemical).',
		},
		location: {
			type: new GraphQLUnionType({
				name: 'AdverseEventlocation_location_Union',
				description: 'The information about where the adverse event occurred.',
				types: () => [require('./location.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Location') {
						return require('./location.schema.js');
					}
				},
			}),
			description: 'The information about where the adverse event occurred.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/adverse-event-seriousness
		seriousness: {
			type: require('./codeableconcept.schema.js'),
			description:
				'Describes the seriousness or severity of the adverse event.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/adverse-event-outcome
		outcome: {
			type: require('./codeableconcept.schema.js'),
			description: 'Describes the type of outcome from the adverse event.',
		},
		recorder: {
			type: new GraphQLUnionType({
				name: 'AdverseEventrecorder_recorder_Union',
				description:
					'Information on who recorded the adverse event.  May be the patient or a practitioner.',
				types: () => [
					require('./patient.schema.js'),
					require('./practitioner.schema.js'),
					require('./relatedperson.schema.js'),
				],
				resolveType(data) {
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
			description:
				'Information on who recorded the adverse event.  May be the patient or a practitioner.',
		},
		eventParticipant: {
			type: new GraphQLUnionType({
				name: 'AdverseEventeventParticipant_eventParticipant_Union',
				description:
					'Parties that may or should contribute or have contributed information to the Act. Such information includes information leading to the decision to perform the Act and how to perform the Act (e.g. consultant), information that the Act itself seeks to reveal (e.g. informant of clinical history), or information about what Act was performed (e.g. informant witness).',
				types: () => [
					require('./practitioner.schema.js'),
					require('./device.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Practitioner') {
						return require('./practitioner.schema.js');
					}
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
				},
			}),
			description:
				'Parties that may or should contribute or have contributed information to the Act. Such information includes information leading to the decision to perform the Act and how to perform the Act (e.g. consultant), information that the Act itself seeks to reveal (e.g. informant of clinical history), or information about what Act was performed (e.g. informant witness).',
		},
		_description: {
			type: require('./element.schema.js'),
			description: 'Describes the adverse event in text.',
		},
		description: {
			type: GraphQLString,
			description: 'Describes the adverse event in text.',
		},
		suspectEntity: {
			type: new GraphQLList(require('./adverseeventsuspectentity.schema.js')),
			description:
				'Describes the entity that is suspected to have caused the adverse event.',
		},
		subjectMedicalHistory: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'AdverseEventsubjectMedicalHistory_subjectMedicalHistory_Union',
					description: 'AdverseEvent.subjectMedicalHistory.',
					types: () => [
						require('./condition.schema.js'),
						require('./observation.schema.js'),
						require('./allergyintolerance.schema.js'),
						require('./familymemberhistory.schema.js'),
						require('./immunization.schema.js'),
						require('./procedure.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Condition') {
							return require('./condition.schema.js');
						}
						if (data && data.resourceType === 'Observation') {
							return require('./observation.schema.js');
						}
						if (data && data.resourceType === 'AllergyIntolerance') {
							return require('./allergyintolerance.schema.js');
						}
						if (data && data.resourceType === 'FamilyMemberHistory') {
							return require('./familymemberhistory.schema.js');
						}
						if (data && data.resourceType === 'Immunization') {
							return require('./immunization.schema.js');
						}
						if (data && data.resourceType === 'Procedure') {
							return require('./procedure.schema.js');
						}
					},
				}),
			),
			description: 'AdverseEvent.subjectMedicalHistory.',
		},
		referenceDocument: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'AdverseEventreferenceDocument_referenceDocument_Union',
					description: 'AdverseEvent.referenceDocument.',
					types: () => [require('./documentreference.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'DocumentReference') {
							return require('./documentreference.schema.js');
						}
					},
				}),
			),
			description: 'AdverseEvent.referenceDocument.',
		},
		study: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'AdverseEventstudy_study_Union',
					description: 'AdverseEvent.study.',
					types: () => [require('./researchstudy.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'ResearchStudy') {
							return require('./researchstudy.schema.js');
						}
					},
				}),
			),
			description: 'AdverseEvent.study.',
		},
	}),
});
