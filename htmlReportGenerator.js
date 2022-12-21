const reporter = require('cucumber-html-reporter');
var date = new Date();
var currentDate = date.getDate() + '_' + (date.getMonth()+1) + '_' 
                + date.getFullYear() + '_' + date.getHours() + '_' 
                + date.getMinutes() + '_' + date.getSeconds();

var options = {
    brandTitle: "Features for End to End Test",
    theme: 'bootstrap',
    jsonFile: 'Reports/cucumber_report.json',
    output: 'Reports/cucumber_report_' + currentDate + '.html',
    screenshotsDirectory: './Screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.1.1",
        "Test Enviroment": "QA",
        "Platform": "Web/Angular",
        "Sprint": "001"
    }
};

reporter.generate(options);