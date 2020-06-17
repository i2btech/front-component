import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: 'red',
  colorSecondary: '#d71f26',

  // UI
  appBg: '#222',
  appContentBg: '#ffffff',
  appBorderColor: '#d71f26',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#fff',
  textInverseColor: 'red',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: 'black',
  barBg: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'I2B Intelligence to Business',
  brandUrl: 'https://www.i2btech.com/',
  brandImage: 'https://www.i2btech.com/wp-content/uploads/2019/02/logo_i2btech_header.svg',
});