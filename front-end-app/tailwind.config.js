const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#58C0ED',
      secondary: '#1F2D42',
      main: '#525353',
      mute: '#F5F6F7',
      disabled: '#D1D4D6',
      error: '#D64650',
      white: '#FFFFFF',
      border: '#D2D4D6',
      ash: '#edeff0',
      cyan: '#58C0EC',
      gray: '#707070',
      success: 'green',
      orange: '#f57f17',
      danger: '#bb002f',
    },
    fontFamily: {

    },
    borderRadius: {

    },
    fontSize: {

    },
    extend: {
      padding: {

      },
      margin: {

      },
      backgroundImage: {

      },
      width: {

      },
      height: {

      },
      minHeight: {

      },
      minWidth: {

      },
      maxWidth: {

      },
      borderWidth: {

      },
    },
  },
  plugins: [],
});
