const appInsights = require('applicationinsights');
const config = require('./../api/configuration/application.config');

// Initialize Application Insights only for staging and production
const isLocal =
  config.environment === 'STAGING' || config.environment === 'PRODUCTION'
    ? false
    : true;

if (!isLocal) {
  appInsights
    .setup(config.appInsightsKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .start();
}

const client = !isLocal ? appInsights.defaultClient : null;

/**
 * Logs failures to either the console (development) or Application Insights (staging/production)
 * @param {string} errorType - The type of error: 'request', 'exception', or 'dependency'
 * @param {string} message - The error message or description
 * @param {Object} [details={}] - Additional context about the failure
 * @param {string} [details.url] - The URL associated with the request
 * @param {string} [details.method] - The HTTP method of the request
 * @param {number} [details.statusCode] - The HTTP status code of the request
 * @param {number} [details.duration] - The duration of the request or dependency call
 * @param {Object} [details.customProperties] - Custom properties for additional logging
 * @param {string} [details.target] - The target of the dependency call
 * @param {string} [details.dependencyName] - The name of the dependency
 * @param {string} [details.data] - The data involved in the dependency call
 * @param {number} [details.resultCode] - The result code of the dependency
 */
const logFailure = (errorType, message, details = {}) => {
  if (isLocal) {
    // Log to console in development
    console.log(`[${errorType}] ${message}`, details);
  } else if (client) {
    // Log to Application Insights in staging/production
    switch (errorType) {
      case 'request':
        client.trackRequest({
          name: details.method || 'GET',
          url: details.url || 'unknown_url',
          duration: details.duration || 0,
          resultCode: String(details.statusCode || 500),
          success: details.statusCode === 200,
        });
        break;

      case 'exception':
        client.trackException({ exception: new Error(message) });
        if (details.customProperties) {
          client.trackTrace({
            message,
            properties: details.customProperties,
          });
        }
        break;

      case 'dependency':
        client.trackDependency({
          target: details.target || 'unknown_service',
          name: details.dependencyName || 'unknown_dependency',
          data: details.data || 'N/A',
          duration: details.duration || 0,
          success: details.statusCode === 200,
          resultCode: String(details.statusCode || 500),
        });
        break;

      default:
        console.warn('Unknown error type:', errorType);
    }
  }
};

module.exports = {
  logFailure,
};
