module.exports = {
  framework: 'mocha',
  launch_in_ci: ['Chrome', 'Firefox'],
  src_files: ['dist/tests.js'],
  browser_args: {
    Chrome: [
      '--disable-gpu',
      '--headless',
      '--remote-debugging-port=0',
      '--window-size=1440,900'
    ],
    Firefox: [
      '-headless',
      '--window-size=1440,900'
    ]
  }
};
