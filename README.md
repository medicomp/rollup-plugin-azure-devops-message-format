# rollup-plugin-azure-devops-message-format

[Rollup](https://rollupjs.org) plugin that formats build messages using [Azure DevOps pipelines logging commands](https://learn.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash) so that warnings are tagged appropriately in build logs.  So this:

```
(!) "this" has been rewritten to "undefined"
https://rollupjs.org/troubleshooting/#error-this-is-undefined
care-planning/nursing-content-task-pane.js
102:                 query: {
103:                     MedcinId: parseInt(medcinId.toString()),
104:                     IncludeFullText: this['includeFullText'] || false,
                                          ^
105:                     Culture: this.settings.culture
106:                 }
```

...becomes this:

```
##vso[task.logissue type=warning;sourcepath=R:\Libraries\quippe-client\libs\qwc\care-planning\nursing-content-task-pane.js;linenumber=104;columnnumber=37]The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten (https://rollupjs.org/troubleshooting/#error-this-is-undefined)
##vso[task.logissue type=warning;sourcepath=R:\Libraries\quippe-client\libs\qwc\care-planning\nursing-content-task-pane.js;linenumber=105;columnnumber=29]The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten (https://rollupjs.org/troubleshooting/#error-this-is-undefined)
```

## Installation

```terminal
$ npm install --save-dev rollup-plugin-azure-devops-message-format
```

- Requires rollup 3.23.0 or later

## Usage

Simply import the plugin and add it to the plugins collection in your *rollup.config.js*:

```javascript
import azureDevOpsMessageFormat from 'rollup-plugin-azure-devops-message-format';

export default [
    defineConfig({
        plugins: [
            azureDevOpsMessageFormat()
        ]
    })
]
```