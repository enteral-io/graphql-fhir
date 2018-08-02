// Schemas
const ProvenanceSchema = require('../../schemas/provenance.schema');
const BundleSchema = require('../../schemas/bundle.schema');

// Arguments
const ProvenanceArgs = require('../../parameters/provenance.parameters');
const CommonArgs = require('../../parameters/common.parameters');

const {
	provenanceResolver,
	provenanceListResolver,
	provenanceInstanceResolver
} = require('./resolver');

/**
 * @name exports.ProvenanceQuery
 * @summary Provenance Query.
 */
module.exports.ProvenanceQuery = {
	args: Object.assign({}, CommonArgs, ProvenanceArgs),
	description: 'Query for a single Provenance',
	resolve: provenanceResolver,
	type: ProvenanceSchema
};

/**
 * @name exports.ProvenanceListQuery
 * @summary ProvenanceList Query.
 */
module.exports.ProvenanceListQuery = {
	args: Object.assign({}, CommonArgs, ProvenanceArgs),
	description: 'Query for multiple Provenances',
	resolve: provenanceListResolver,
	type: BundleSchema
};

/**
 * @name exports.ProvenanceInstanceQuery
 * @summary ProvenanceInstance Query.
 */
module.exports.ProvenanceInstanceQuery = {
	description: 'Get information about a single Provenance',
	resolve: provenanceInstanceResolver,
	type: ProvenanceSchema
};
