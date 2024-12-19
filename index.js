/** @typedef {import('rollup').Plugin} RollupPlugin */
/** @typedef {import('rollup').PluginContext} RollupPluginContext */
/** @typedef {import('rollup').RollupLog} RollupLog */
/** @typedef {import('rollup').LogLevel} LogLevel */

/**
 * @returns {RollupPlugin}
 */
export default function azureDevOpsMessageFormat() {
    return {
        name: 'azure-devops-message-format',

        /**
         * @returns {boolean}
         * @param {LogLevel} level
         * @param {RollupLog} log 
         * @this {RollupPluginContext}
         */
        onLog(level, log) {
            if (!process.env['TF_BUILD']) {
                return true;
            }

            if (level === 'warn') {
                let message = '##vso[task.logissue type=warning';

                if (log.loc) {
                    if (log.loc.file) {
                        message += ';sourcepath=' + log.loc.file;
                    }

                    if (log.loc.line) {
                        message += ';linenumber=' + log.loc.line;
                    }

                    if (log.loc.column) {
                        message += ';columnnumber=' + log.loc.column;
                    }
                }

                message += ']' + log.message;

                if (log.url) {
                    message += ' (' + log.url + ')';
                }

                console.log(message);
                return false;
            }

            return true;
        }
    }
}