const { GraphQLList, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const OidScalar = require('../scalars/oid.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');

/**
 * @name exports
 * @summary ImagingObjectSelectionstudyseries Schema
 */
module.exports = new GraphQLObjectType({
	name: 'ImagingObjectSelectionstudyseries',
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
		_uid: {
			type: require('./element.schema.js'),
			description: 'Series instance UID of the SOP instances in the selection.',
		},
		uid: {
			type: OidScalar,
			description: 'Series instance UID of the SOP instances in the selection.',
		},
		_url: {
			type: require('./element.schema.js'),
			description:
				'WADO-RS URL to retrieve the series. Note that this URL retrieves all SOP instances of the series not only those in the selection.',
		},
		url: {
			type: UriScalar,
			description:
				'WADO-RS URL to retrieve the series. Note that this URL retrieves all SOP instances of the series not only those in the selection.',
		},
		instance: {
			type: new GraphQLList(
				new GraphQLNonNull(
					require('./imagingobjectselectionstudyseriesinstance.schema.js'),
				),
			),
			description:
				'Identity and locating information of the selected DICOM SOP instances.',
		},
	}),
});
