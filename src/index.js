const createHafas = require("hafas-client");
const dbProfile = require("hafas-client/p/db");

const createApi = require("..");

// pro tip: pipe this script into `pino-pretty` to get nice logs

const config = {
  hostname: process.env.HOSTNAME || "db-rest-api.herokuapp.com",
  port: process.env.PORT || 80, // todo [breaking]: remove, not necessary
  name: "db-rest",
  description: "An HTTP API for Deutsche Bahn.",
  homepage: "http://example.org/",
  docsLink: "http://example.org/docs",
  logging: true,
  healthCheck: () => {
    return hafas.stop("8011306").then(stop => !!stop);
  }
};

const hafas = createHafas(dbProfile, "hafas-rest-api-example");

const api = createApi(hafas, config, () => {});

const { logger } = api.locals;
api.listen(config.port, err => {
  if (err) {
    logger.error(err);
    process.exitCode = 1;
  } else {
    logger.info(`Listening on ${config.hostname}:${config.port}.`);
  }
});
