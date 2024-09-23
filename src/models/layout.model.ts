import { type CSSProperties } from "react";
import { type LayoutFilterMethod } from "@components/LayoutParts";
import { type SxProps } from "@mui/material";
import { FIELD_TYPES as JSTYPES } from "@timmons-group/shared-react-components";

const FIELD_TYPES = {
  ...JSTYPES
} as const;

export const LAYOUT_TYPES = {
  columns: 'columns',
  panel: 'panel',
  description: 'description',
  title: 'title',
  divider: 'divider',
  container: 'container',
  customComponent: 'customComponent',
} as const;

export const DATA_FIELD_TYPES = {
  text: 'text',
  int: 'int',
  float: 'float',
  currency: 'currency',
  date: 'date',
  boolean: 'boolean',
  choice: 'choice',
  object: 'object',
  radio: 'radio',
  flag: 'flag',
} as const;

//create a union type for the different types of fields using the keyof the FIELD_TYPES object
export type FieldType = keyof typeof FIELD_TYPES;
export type DataFieldTypes = Lowercase<FieldType>;

export type LayoutComponent = LayoutCustomComponent | LayoutColumns | LayoutDivider | LayoutContainer | LayoutDescription | LayoutTitle | LayoutPanel | LayoutField;

// User defined type guard | https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
export const isADataField = (type: string): type is DataFieldTypes => {
  return Object.keys(DATA_FIELD_TYPES).includes(type);
}

export type LayoutTypes = keyof typeof LAYOUT_TYPES | DataFieldTypes;
export type LayoutAppearanceTypes = LayoutTypes | 'allFields';

export interface LayoutField {
  key: string;
  type: DataFieldTypes;
  label?: string;
  input: boolean;
  maxWidth?: string;
  appearance?: Appearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutDefinition {
  components: LayoutComponent[];
  appearance?: Appearance;
  baseAppearance?: BaseAppearance;
}

export interface LayoutCustomComponent {
  key: string;
  type: typeof LAYOUT_TYPES.customComponent;
  appearance?: Appearance;
  components?: LayoutComponent[];
  customProps?: Record<string, any>;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface Appearance {
  className?: string;
  style?: CSSProperties;
  sx?: SxProps;
  meta?: Record<string, any>;
};

// extend the Appearance interface to include the text properties
export interface TextAppearanceProperties extends Appearance {
  variant?: string;
};

export interface PanelAppearance extends Appearance {
  header?: Appearance;
  headerText?: TextAppearanceProperties;
  description?: Appearance;
  descriptionText?: TextAppearanceProperties;
  content?: Appearance;
};

// base appearance should be a map of the form component types to their appearance
// this will allow for the form to be styled based on the type of component
export type BaseAppearance = {
  [key in LayoutAppearanceTypes]?: Appearance | TextAppearanceProperties | PanelAppearance;
};

export interface LayoutColumns {
  key: string;
  type: typeof LAYOUT_TYPES.columns;
  columns: LayoutColumn[];
  appearance?: Appearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutColumn {
  width: number;
  size: string;
  components: LayoutComponent[];
  appearance?: Appearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutDivider {
  key?: string;
  type: typeof LAYOUT_TYPES.divider;
  appearance?: Appearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutContainer{
  key: string;
  type: typeof LAYOUT_TYPES.container;
  collapsible?: boolean;
  collapsed?: boolean;
  components: LayoutComponent[];
  appearance?: Appearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutDescription {
  key: string;
  type: typeof LAYOUT_TYPES.description;
  description: string;
  appearance?: TextAppearanceProperties;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutTitle {
  key: string;
  type: typeof LAYOUT_TYPES.title;
  title: string;
  appearance?: TextAppearanceProperties;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}

export interface LayoutPanel {
  key: string;
  type: typeof LAYOUT_TYPES.panel;
  title: string;
  description?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  addContentDivider?: boolean;
  components: LayoutComponent[];
  appearance?: PanelAppearance;
  globalFilters?: string[];
  filters?: Record<string, LayoutFilterMethod>;
  meta?: Record<string, any>;
}