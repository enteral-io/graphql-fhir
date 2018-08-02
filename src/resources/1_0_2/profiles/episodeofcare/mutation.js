// Scalars
const IdScalar = require('../../scalars/id.scalar');

// Schemas
const EpisodeOfCareSchema = require('../../schemas/episodeofcare.schema');

// Inputs
const EpisodeOfCareInput = require('../../inputs/episodeofcare.input');


const {
	episodeofcareCreateResolver,
	episodeofcareUpdateResolver,
	episodeofcareDeleteResolver
} = require('./resolver');

let WriteArgs = {
	id: {
		type: IdScalar,
		description: 'Unique identifier for creating/updating a EpisodeOfCare record.'
	},
	resource: {
		type: EpisodeOfCareInput,
		description: 'EpisodeOfCare Information for the record.'
	}
};

let DeleteArgs = {
	id: {
		type: IdScalar,
		description: 'Unique identifier for selecting a EpisodeOfCare record for deletion.'
	}
};

/**
 * @name exports.EpisodeOfCareCreateMutation
 * @summary EpisodeOfCareCreate Mutation.
 */
module.exports.EpisodeOfCareCreateMutation = {
	args: WriteArgs,
	description: 'Create a EpisodeOfCare',
	resolve: episodeofcareCreateResolver,
	type: EpisodeOfCareSchema
};

/**
 * @name exports.EpisodeOfCareUpdateMutation
 * @summary EpisodeOfCareUpdate Mutation.
 */
module.exports.EpisodeOfCareUpdateMutation = {
	args: WriteArgs,
	description: 'Query for multiple EpisodeOfCares',
	resolve: episodeofcareUpdateResolver,
	type: EpisodeOfCareSchema
};

/**
 * @name exports.EpisodeOfCareDeleteMutation
 * @summary EpisodeOfCareDelete Mutation.
 */
module.exports.EpisodeOfCareDeleteMutation = {
	args: DeleteArgs,
	description: 'Get information about a single EpisodeOfCare',
	resolve: episodeofcareDeleteResolver,
	type: EpisodeOfCareSchema
};
