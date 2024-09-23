import { type CSSProperties } from 'react';
import { darken, buttonBaseClasses, type Theme, lighten} from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';
import { createMergedTheme } from '@timmons-group/shared-react-components';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    detailItem: CSSProperties;
    homeBlurb: CSSProperties;
    sectionDescription: CSSProperties;
    rulesDescription: CSSProperties;
    detailItemSeparator: CSSProperties;
    navLink: CSSProperties;
    altTextLink: CSSProperties;
    subHeader: CSSProperties;
    subHeaderText: CSSProperties;
    inspector: CSSProperties;
    lineItem: CSSProperties;
    sectionHeader: CSSProperties;
    sectionHeaderSpaceAbove: CSSProperties;
    panelHeader: CSSProperties;
    panelDescription: CSSProperties;
    modalTitle: CSSProperties;
    strikeThrough: CSSProperties;
    clusterEmptyText: CSSProperties;
    summaryValue: CSSProperties;
    summaryTitle: CSSProperties;
    mobileUserName: CSSProperties;
    mobileUserEmail: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    detailItem: CSSProperties;
    homeBlurb: CSSProperties;
    rulesDescription: CSSProperties;
    sectionDescription: CSSProperties;
    detailItemSeparator: CSSProperties;
    navLink: CSSProperties;
    altTextLink: CSSProperties;
    subHeader: CSSProperties;
    subHeaderText: CSSProperties;
    inspector: CSSProperties;
    lineItem: CSSProperties;
    sectionHeader: CSSProperties;
    sectionHeaderSpaceAbove: CSSProperties;
    panelHeader: CSSProperties;
    panelDescription: CSSProperties;
    modalTitle: CSSProperties;
    strikeThrough: CSSProperties;
    clusterEmptyText: CSSProperties;
    summaryValue: CSSProperties;
    summaryTitle: CSSProperties;
    mobileUserName: CSSProperties;
    mobileUserEmail: CSSProperties;
  }

  //Some of the color options are not available in the default theme
  interface TypographyColor {
    error: string;
  }

  interface TypographyColorOptions {
    error: string;
  }

  interface Palette {
    regressive: Palette['primary'];
    progressive: Palette['primary'];
    tertiary: Palette['primary'];
    ancillary: Palette['primary'];
  }

  interface PaletteOptions {
    regressive: PaletteOptions['primary'];
    progressive: PaletteOptions['primary'];
    tertiary: PaletteOptions['primary'];
    ancillary: PaletteOptions['primary'];
  }

  interface Theme {
    appBar: {
      logo: CSSProperties;
      logoText: CSSProperties;
    };
    layoutPanelHeaderContainer: CSSProperties;
    layoutPanelDescriptionContainer: CSSProperties;
    iconButton: CSSProperties;
    cancelIconButton: CSSProperties;
    resetIconButton: CSSProperties;
    pamGrid: CSSProperties;
    configView: {
      clusterField: {
        alternateRowColor: string;
        headerColor: string;
        headerTextColor: string;
      };
    };
  }

  interface ThemeOptions {
    appBar: {
      logo: CSSProperties;
      logoText: CSSProperties;
    };
    layoutPanelHeaderContainer: CSSProperties;
    layoutPanelDescriptionContainer: CSSProperties;
    iconButton: CSSProperties;
    cancelIconButton: CSSProperties;
    resetIconButton: CSSProperties;
    pamGrid: CSSProperties;
    configView: {
      clusterField: {
        alternateRowColor: string;
        headerColor: string;
        headerTextColor: string;
      };
    };
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    [key: string]: boolean | undefined;
  }

  interface TypographyPropsColorOverrides {
    error: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    regressive: true;
    progressive: true;
    tertiary: true;
    ancillary: true;
  }

  interface ButtonPropsVariantOverrides {
    panel: true;
    textLink: true;
  }

  // The SRC theme override the MUIButton LinkComponent Prop to use NavLink from react-router-dom
  // We need to tell TypeScript that "end" is a valid prop for the Button component
  interface ButtonOwnProps {
    end?: boolean;
  }
}

export const fontFamily = '"OpenSans-Regular", "Helvetica", "Arial", "sans-serif"';
// const fontSemibold = '"OpenSans-SemiBold", "Helvetica", "Arial", "sans-serif"';
export const sansFontBold = '"OpenSans-Bold", "Helvetica", "Arial", "sans-serif"';
export const appBarHeight = 64;

const stormBlue = '#005672';
const baseBlue = '#0054D2';
const baseText = '#383838';

const teal = '#B0D4BF';
const primary = baseBlue;
const tertiary = '#445979';
const darkBlue = '#003C83';
const veryDarkBlue = '#172E3B';
const golden = '#FF9922';
const gross = '#90DD44';

export const colors = {
  stormBlue,
  baseBlue,
  baseText,
  teal,
  primary,
  tertiary,
  darkBlue,
  veryDarkBlue,
  golden,
};

const textLinkStyle = {
  padding: '0px',
  color: `${darkBlue}`,
  fontFamily: `${sansFontBold} !important`,
  textTransform: 'none',
  background: 'none',
  cursor: 'pointer',
  textDecoration: 'none !important',
  '&:hover': { textDecoration: 'underline !important', background: 'none', },
};

const themeOverrides = {
  layoutPanelHeaderContainer: {
    backgroundColor: 'white',
    padding: '8px 16px',
  },
  layoutPanelDescriptionContainer: {
    padding: '8px 16px',
  },
  pamGrid: {
    [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
      outline: 'transparent',
    },
    [`.${gridClasses.columnHeader}[data-field="actions"]`]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
    [`.${gridClasses.cell}[data-field="actions"]`]: {
      display: 'flex',
      justifyContent: 'center',
    },
    [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
      outline: 'none',
    },
    [`& .${gridClasses.columnHeader}:last-child .${gridClasses.columnSeparator}`]: {
      display: 'none',
    },
    [`& .${gridClasses.columnHeader}`]: {
      backgroundColor: stormBlue,
      color: 'white',
    },
    [`& .${gridClasses.iconButtonContainer} > .${buttonBaseClasses.root}`]: {
      color: 'white',
    },
    [`& .${gridClasses.menuIcon} > .${buttonBaseClasses.root}`]: {
      color: 'white',
    },
    '& .row-odd': {
      backgroundColor: '#e6ecf2',
    },
    [`.${gridClasses.toolbarContainer}`]: {
      paddingBottom: '8px',
      // This is the container for the toolbar.
      button: {
        marginRight: '8px',
      },
      'button:last-of-type': {
        marginRight: '0px',
      },
    }
  },
  iconButton: {
    backgroundColor: golden,
    color: stormBlue,
    padding: '4px',
    fontSize: '8px !important',
    '&:hover': {
      backgroundColor: darken(golden, 0.25),
    }
  },
  cancelIconButton: {
    backgroundColor: (theme: Theme) => theme.palette.regressive.main,
    color: '#FFFFFF',
    padding: '4px',
    fontSize: '8px !important',
    '&:hover': {
      // backgroundColor: darken('#DA0000', 0.25),
      backgroundColor: (theme: Theme) => darken(theme.palette.regressive.main, 0.25),
    }
  },
  resetIconButton: {
    backgroundColor: stormBlue,
    color: '#FFFFFF !important',
    padding: '4px',
    fontSize: '8px !important',
    '&:hover': {
      backgroundColor: darken(stormBlue, 0.25),
    }
  },
  configView: {
    clusterField: {
      alternateRowColor: '#F6F6F6',
      headerColor: stormBlue,
      headerTextColor: '#FFFFFF',
    },
  },
  checklist: {
    alternateRowColor: '#F6F6F6',
    headerColor: stormBlue,
    headerTextColor: '#FFFFFF',
  },
  palette: {
    text: {
      header: stormBlue,
      special: '#FFDE58',
    },
    background: {
      default: '#EDEDED',
    },
    hover: {
      dark: '#001F35',
    },
    primary: {
      main: primary,
      light: '#027AC8',
      text: '#ffffff',
    },
    secondary: {
      main: teal,
      light: '#F68802',
      text: '#ffffff',
    },
    regressive: {
      main: '#C10000',
      dark: darken('#C10000', 0.25),
      contrastText: '#ffffff',
    },
    ancillary: {
      main: gross,
      dark: darken(gross, 0.25),
      text: '#003C83',
      contrastText: '#003C83',
    },
    progressive: {
      main: golden,
      dark: darken(golden, 0.15),
      // light: 'purple',
      // dark: golden,
      text: '#003C83',
      contrastText: '#003C83',
    },
    tertiary: {
      main: tertiary,
      contrastText: '#FFFFFF',
      text: '#FFFFFF',
      light: '#c5c871',
      dark: stormBlue,
      lightBlue: '#2B5C92',
    },
    accent: {
      main: '#FFFFFF',
      contrastText: '#1F4765',
    },
    toggleBackground: {
      main: '#A5FF98',
    },
  },
  typography: {
    fontFamily: `${fontFamily} !important`,
    textLink: textLinkStyle,
    altTextLink: {
      ...textLinkStyle,
      color: `${golden} !important`,
    },
    allVariants: {
      fontFamily: `${fontFamily} !important`,
    },
    navLink: {
      fontFamily: `${sansFontBold} !important`,
      fontSize: '0.875rem',
      color: `${primary} !important`,
      textDecorationColor: `${primary} !important`,
      marginTop: 2,
      marginBottom: 2,
    },
    homeBlurb: {
      fontFamily: `${sansFontBold} !important`,
      paddingTop: '16px',
      paddingBottom: '16px',
      color: 'white',
      textAlign: 'center',
    },
    subHeader: {
      fontFamily: `${fontFamily} !important`,
      color: stormBlue,
      fontSize: '18px',
    },
    subHeaderText: {
      fontFamily: `${fontFamily} !important`,
      fontSize: '18px',
      color: baseText,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    sidebarTitle: {
      fontFamily: `${fontFamily} !important`,
      fontSize: '18px',
      color: '#333333',
    },
    lineItem: {
      fontSize: '0.875rem',
      marginTop: '8px',
      marginBottom: '8px',
    },
    detailItem: {
      fontSize: '0.875rem',
      marginTop: '8px',
      marginBottom: '8px',
      '&.label': {
        fontFamily: `${sansFontBold} !important`,
      }
    },
    cardTitle: {
      fontFamily: `${sansFontBold} !important`,
      fontSize: '19px',
      textAlign: 'center',
      paddingTop: 0,
      color: darkBlue,
    },
    sectionHeader: {
      color: stormBlue,
      fontFamily: `${sansFontBold} !important`,
      fontWeight: 'normal',
    },
    sectionDescription: {
      fontFamily: `${fontFamily} !important`,
      fontSize: '18px',
      color: baseText
    },
    rulesDescription: {
      fontFamily: `${fontFamily} !important`,
      fontStyle: 'normal',
      color: `${baseText} !important`,
    },
    sectionHeaderSpaceAbove: {
      fontFamily: `${sansFontBold} !important`,
      fontSize: '1rem',
      color: stormBlue,
      marginTop: '20px',
      marginBottom: 2,
    },
    panelHeader: {
      fontFamily: `${sansFontBold} !important`,
      fontWeight: 'normal',
      fontSize: '16px',
      color: stormBlue,
      marginTop: '4px',
      marginBottom: 0,
    },
    panelDescription: {
      fontFamily: `${fontFamily} !important`,
      fontStyle: 'normal',
      color: '#30302B !important',
    },
    summaryTitle: {
      fontFamily: `${fontFamily} !important`,
      fontSize: '1rem',
      fontWeight: '400',
      color: baseText,
    },
    mobileUserName: {
      fontFamily: `${sansFontBold} !important`,
      padding: '8px',
      textAlign: 'center',
      fontSize: '1rem'
    },
    mobileUserEmail: {
      padding: '8px',
      textAlign: 'center',
      fontStyle: 'italic',
      fontSize: '0.85rem'
    },
    summaryValue: {
      fontFamily: `${sansFontBold} !important`,
      fontSize: '2rem',
      color: stormBlue,
      fontWeight: '700',
      marginBottom: '8px',
    },
    modalTitle: {
      fontFamily: `${sansFontBold} !important`,
      fontSize: '1.2rem',
      color: stormBlue,
      marginTop: '20px',
      marginBottom: '0',
      textAlign: 'center',
    },
    strikeThrough: {
      fontSize: '0.875rem',
      textDecoration: 'line-through',
      color: baseText,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // add custom variants here
          homeBlurb: 'p',
          sectionHeaderSpaceAbove: 'h1',
          subHeader: 'h1',
          sidebarTitle: 'h2',
          panelHeader: 'h2',
          summaryTitle: 'h3',
          summaryValue: 'h3',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: baseText,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        h1: {
          fontSize: '16px',
          color: stormBlue,
        },
      },
    },
    MuiButton: {
      // Because of how the theme is merged any array values must be fully duplicated
      variants: [
        {
          props: {
            variant: 'contained',
            color: 'regressive',
          },
          style: {
            textTransform: 'uppercase !important',
          },
        },
        {
          props: {
            variant: 'contained',
          },
          style: {
            textTransform: 'none',
            fontFamily: `${sansFontBold} !important`,
            borderRadius: 28,
          },
        },
        {
          props: {
            variant: 'clusterAdd',
          },
          style: textLinkStyle
        },
        {
          props: {
            variant: 'textLink',
          },
          style: textLinkStyle
        },
        {
          props: {
            variant: 'iconButton',
          },
          style: {
            color: stormBlue,
            background: 'none',
            justifyContent: 'flex-start',
            '&:hover': { color: veryDarkBlue, },
            paddingLeft: '9px',
            paddingRight: '9px',
          },
        },
        {
          props: {
            variant: 'inlineClusterRemove',
          },
          style: {
            marginTop: '9px',
            borderRadius: 28,
            color: '#DA0000',
            background: 'none',
            '&:hover': { background: '#DA0000', color: '#FFFFFF', },
          },
        },
        {
          props: {
            variant: 'gridActionEdit',
          },
          style: {
            color: `${stormBlue} !important`,
            textTransform: 'none'
          },
        },
        {
          props: {
            variant: 'gridActionView',
          },
          style: {
            color: `${stormBlue} !important`,
            textTransform: 'none'
          },
        },
        {
          props: {
            variant: 'gridActionDelete',
          },
          style: {
            color: `${stormBlue} !important`,
            textTransform: 'none'
          },
        },
        {
          props: {
            variant: 'user',
          },
          style: {
            background: 'none',
          },
        },
        {
          props: {
            variant: 'panel',
          },
          style: {
            display: 'block',
            borderRadius: '0px',
            textTransform: 'none',
            marginRight: '0px !important',
            marginLeft: '0px !important',
            color: `${stormBlue} !important`,
            '&.active': {
              background: '#EBEEF1',
              cursor: 'not-allowed',
            },
          },
        },
        {
          props: {
            variant: 'appbar',
          },
          style: {
            color: 'white',
            borderRadius: '0px',
            background: 'none',
            '&.active': {
              borderBottom: '2px solid',
              borderColor: teal,
            },
          },
        },
        {
          props: {
            variant: 'appbarMobile',
          },
          style: {
            background: 'none',
            '&.active': {
              color: '#ffffff',
              background: lighten(primary, 0.25),
            },
          },
        },
        {
          props: {
            variant: 'dashed',
          },
          style: {
            textTransform: 'none',
            border: '2px dashed grey',
          },
        },
      ],
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: '#ffffff',
          '&.Mui-completed, &.Mui-active': {
            color: 'white',
          },
        }
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: 'green',
          },
          '&.Mui-active': {
            color: 'yellow',
            '.MuiStepIcon-text': {
              fill: 'black',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primary,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
        },
      },
    },
  },
};

const theTheme = createMergedTheme(themeOverrides);

export default theTheme;
