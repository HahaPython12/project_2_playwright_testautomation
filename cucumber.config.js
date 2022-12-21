let options = [
    '--require-module ts-node/register',
    '--require ./acceptance/steps/*.steps.ts',
    '--format progress',
].join(' ');

let run_features = [
    './acceptance/features/',
    options,
].join(' ');

module.exports = {
    test_runner: run_features
};