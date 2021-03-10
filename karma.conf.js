// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { getEnvironment } = require('universal-dotenv');
const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-spec-reporter'),
      require('karma-junit-reporter'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      // TODO #1431: horrible workaround, fix environment variables for tests and get rid of this monster
      args: [`TEST_API_REGRESSION:${process.env.TEST_API_REGRESSION}`],
    },
    // the default configuration
    junitReporter: {
      outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
    },
    specReporter: {
      suppressSkipped: true, // don't print skipped tests
      showSpecTiming: true, // print the time elapsed for each spec
    },
    reportSlowerThan: 500,
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless'],
      },
    },
    reporters: ['kjhtml', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadlessCustom'],
    autoWatch: true,
    singleRun: true,
    restartOnFileChange: true,
    proxies: require('./proxy-conf.json'),
  });

  config.buildWebpack.webpackConfig.plugins.push(new webpack.DefinePlugin(getEnvironment().webpack));
};
