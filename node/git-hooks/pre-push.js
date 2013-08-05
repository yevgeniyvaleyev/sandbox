#!/bin/node

/**
 * Installation guideline:
 * To use this hook you need at least 1.8.2 version of GIT installed
 * sudo ln -s /usr/local/bin/node /bin/node
 * cd ./.git/hooks
 * ln -s ../../build/git-hooks/pre-push.js pre-push && chmod +x pre-push
 */

var exec = require('child_process').exec,
    colors = require('colors'),
    grunt = require('grunt'),
    hook_prompt = require('prompt'),
    base_message = 'pre push hook: '.magenta,
    hook_message = {
        success: base_message + 'SUCCESS'.green,
        ignored: base_message + 'IGNORED'.yellow +
            '\n due to a char \'!\' was found in the beginning of the last commit message'.cyan,
        question: base_message + 'You have modified files. Do you want them to be ignored? (yes/no)'.cyan
    };


/**
 * Checks if there are modified files
 * @param callback
 */
function isModifiedFiles(callback) {
    'use strict';
    exec('git ls-files -m', function (error, stdout, stderr) {
        var status = false;
        if (stdout !== '') {
            status = true;
        }
        callback(status);
    });
}

/**
 * Checks if there is a '!' char in the beginning of the last commit
 */
function isHookIgnored(callback) {
    'use strict';
    exec('git log -1 --pretty=%B', function (error, stdout, stderr) {
        var status = false;

        if (stdout !== '' && stdout.charAt(0) === '!') {
            status = true;
        }
        callback(status);
    });
}

/**
 * Prompts to ignore modified files
 * @param callback
 */
function prompt(callback) {
    'use strict';
    hook_prompt.start();
    console.log(hook_message.question);
    hook_prompt.get(['answer'], function (err, result) {
        if (err || result.answer !== 'yes') {
            process.exit(1);
        } else {
            callback();
        }
    });
}

/**
 * Runs tests
 */
function runTests() {
    'use strict';

    isModifiedFiles(function (isModified) {
        if (!isModified) {
            runTask();
        } else {
            prompt(function () {
                runTask();
            });
        }
    });
    function runTask() {
        grunt.tasks(['test:jenkins'], {}, function () {
            console.log(hook_message.success);
            process.exit(0);
        });
    }
}

/**
 * Runs the hook
 */
(function () {
    'use strict';

    isHookIgnored(function (isIgnored) {
        if (isIgnored) {
            console.log(hook_message.ignored);
            process.exit(0);
        } else {
            runTests();
        }
    });
})();