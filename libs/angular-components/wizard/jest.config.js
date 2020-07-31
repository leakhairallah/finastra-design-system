const name = 'wizard';
const suiteName = 'WizardModule';

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  name: name,
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/components/wizard',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './testresults/',
        outputName: `junit-${name}.xml`,
        suiteName,
        classNameTemplate: '{classname}',
        titleTemplate: `${suiteName} › {classname} › {title}`,
        ancestorSeparator: ' › '
      }
    ]
  ]
};
