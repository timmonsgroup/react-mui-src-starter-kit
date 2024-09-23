// External imports
import { type FC, type ReactNode, useState } from "react";
import { ClusterTable, LinkValue } from "@timmons-group/shared-react-components";
import { DynamicField, FIELD_TYPES } from "@timmons-group/config-form";
import { Box, Card, CardContent, Collapse, Divider, Stack, type SxProps, Typography, styled, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormContext } from "react-hook-form";

// Local imports
import { FormField, type UseFormReturnWithSections } from "@models/form.model";
import {
  type Appearance, type BaseAppearance, type LayoutTypes, type LayoutColumn,
  type LayoutComponent, type LayoutField, type LayoutPanel, LayoutAppearanceTypes, LayoutContainer,
  isADataField, DataFieldTypes, PanelAppearance,
} from "@models/layout.model";

export type FormPanelAppearanceMeta = {
  headerContainer?: Appearance;
  header?: Appearance;
  content?: Appearance;
  icon?: Appearance;
}

// Create a type for all the known valid component types
export type LayoutComponentRendererTypes = LayoutTypes | 'allComponents' | 'allFields';

/**
 * The LayoutComponentsRenderers type is a record of the different types of components that can be rendered
 * and the method to render them
 * @param types - allows each component type to have a specific render method
 * @param ids - allows for specific components to have a specific render method
 */
export type LayoutComponentsRenderers = {
  types?: Partial<Record<LayoutComponentRendererTypes, LayoutComponentRenderMethod>>;
  ids?: Record<string, LayoutComponentRenderMethod>;
}

export type LayoutComponentRenderMethod = (
  component: LayoutComponent, allFields?: Record<string, any>[], baseAppearance?: BaseAppearance, index?: number, options?: any
) => JSX.Element | null;

export type LayoutFilterMethod = (component: LayoutComponent) => boolean;

export type LayoutComponentsOptions = {
  renderers: LayoutComponentsRenderers;
  globalFilterMethods?: Record<string, (component: LayoutComponent) => boolean>;
}

export interface SharedLayoutPartsProps {
  allFields?: Record<string, any>[];
  baseAppearance?: BaseAppearance;
  options?: LayoutComponentsOptions;
}

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const createSX = (baseAppearance: BaseAppearance | undefined, componentAppearance: Appearance | undefined, componentType: LayoutAppearanceTypes) => {
  let sx: SxProps = baseAppearance?.[componentType]?.sx ?? {};
  if (componentAppearance?.sx) {
    sx = { ...sx, ...componentAppearance.sx } as SxProps;
  }

  return sx;
}

export const createFieldSX = (baseAppearance: BaseAppearance | undefined, componentAppearance: Appearance | undefined, componentType: DataFieldTypes) => {
  const allBase = baseAppearance?.allFields?.sx ?? {};
  const typeBase = baseAppearance?.[componentType]?.sx ?? {};
  const componentSpecific = componentAppearance?.sx ?? {};
  // return the merged options
  // componentSpecific will override typeBase, which will override allBase
  return { ...allBase, ...typeBase, ...componentSpecific };
}

export const createFieldStyle = (baseAppearance: BaseAppearance | undefined, componentAppearance: Appearance | undefined, componentType: DataFieldTypes) => {
  const allBase = baseAppearance?.allFields?.style ?? {};
  const typeBase = baseAppearance?.[componentType]?.style ?? {};
  const componentSpecific = componentAppearance?.style ?? {};
  // return the merged options
  // componentSpecific will override typeBase, which will override allBase
  return { ...allBase, ...typeBase, ...componentSpecific };
}

export const getMetaFieldOptions = (baseAppearance: BaseAppearance | undefined, componentAppearance: Appearance | undefined, componentType: DataFieldTypes) => {
  const allBase = baseAppearance?.allFields?.meta?.fieldOptions ?? {};
  const typeBase = baseAppearance?.[componentType]?.meta?.fieldOptions ?? {};
  const componentSpecific = componentAppearance?.meta?.fieldOptions ?? {};
  // return the merged options
  // componentSpecific will override typeBase, which will override allBase
  return { ...allBase, ...typeBase, ...componentSpecific };
}

type FilteredComponentProps = {
  component: LayoutComponent;
  children: ReactNode;
  globalFilters?: Record<string, LayoutFilterMethod>;
}
const FilteredComponent: FC<FilteredComponentProps> = ({ component, children, globalFilters }) => {
  // look! an actual let variable to allow for reassignment
  let isVisible = true;

  // check if the component has any global filters
  if (component.globalFilters?.length) {
    isVisible = component.globalFilters.some((filter: string) => {
      if (globalFilters?.[filter]) {
        return globalFilters[filter](component);
      }
      return true;
    });
  };

  // if the component is still visible check the component specific filters
  if (isVisible) {
    if (component.filters) {
      isVisible = Object.keys(component.filters).some((filter: string) => {
        return component.filters?.[filter](component);
      });
    }
  }

  if (!isVisible) {
    return null;
  }

  return children;
}

export type RenderedLayoutComponentProps = SharedLayoutPartsProps & {
  component: LayoutComponent;
  index?: number;
}

export const RenderedLayoutComponent: FC<RenderedLayoutComponentProps> = ({ component, index, ...sharedProps }) => {
  const { allFields, baseAppearance, options } = sharedProps;
  const typeRenders = options?.renderers?.types;
  let customRender = typeRenders?.[component.type] || typeRenders?.allComponents;
  // check if the component is a FormField and if options has the "allFields" renderer use it as the custom render
  if (isADataField(component.type) && typeRenders?.allFields) {
    customRender = customRender || typeRenders.allFields;
  }

  if (component.key) {
    // check if there is a custom render method for this component
    customRender = options?.renderers?.ids?.[component.key] || customRender;
  }

  if (customRender) {
    return customRender(component, allFields, baseAppearance, index, options);
  }

  const sx = createSX(baseAppearance, component.appearance, component.type);
  const sharedComponentProps = { component, globalFilters: options?.globalFilterMethods};

  switch (component.type) {
    case 'columns': {
      return <FilteredComponent {...sharedComponentProps}>
        <Columns columns={component.columns} {...sharedProps} />
      </FilteredComponent>
    }
    case 'panel':
      return <FilteredComponent {...sharedComponentProps}>
        <PanelComponent index={index} component={component} {...sharedProps} />
      </FilteredComponent>
    case 'description': {
      return <FilteredComponent {...sharedComponentProps}>
        <Typography sx={sx} variant="sectionDescription">{component.description}</Typography>
      </FilteredComponent>
    }
    case 'title': {
      return <FilteredComponent {...sharedComponentProps}>
        <Typography sx={sx} variant="sectionHeader">{component.title}</Typography>
      </FilteredComponent>
    }
    case 'divider': {
      return <FilteredComponent {...sharedComponentProps}>
        <Divider sx={sx} />
      </FilteredComponent>
    }
    case 'container':
      return <FilteredComponent {...sharedComponentProps}>
        <LayoutContainerComponent component={component} {...sharedProps} />
      </FilteredComponent>
    case 'date':
    case 'int':
    case 'float':
    case 'currency':
    case 'choice':
    case 'flag':
    case 'object':
    case 'text': {
      const fieldComponent = component;
      const field = allFields?.find((field: Record<string, any>) => {
        if (fieldComponent.input) {
          return field.render?.name === component.key;
        }
        return field.id === component.key;
      });

      if (!field) {
        return <div>Field not found</div>;
      }

      if (fieldComponent.input) {
        return <FilteredComponent component={component} globalFilters={options?.globalFilterMethods}>
          <AFormField component={fieldComponent as FormField} field={field} baseAppearance={baseAppearance} />
        </FilteredComponent>
      }

      return <FilteredComponent component={component} globalFilters={options?.globalFilterMethods}>
        <ADataField component={fieldComponent} field={field} baseAppearance={baseAppearance} />
      </FilteredComponent>
    }
    default:
      return <div>Unknown</div>;
  }
}

type AFormFieldProps = {
  component: FormField;
  field: Record<string, any>;
  baseAppearance?: BaseAppearance;
}
const AFormField: FC<AFormFieldProps> = ({ component, field, baseAppearance }) => {
  const allContext = useFormContext() as unknown as UseFormReturnWithSections;
  const { control } = allContext.useFormObject;

  const fieldSX = createFieldSX(baseAppearance, component.appearance, component.type);

  // Get the field options from the meta field options
  const fieldOptions = getMetaFieldOptions(baseAppearance, component.appearance, component.type as DataFieldTypes);

  // if the component has a maxWidth, set it in the props
  // otherwise, just pass the options
  const props = component.maxWidth ? { options: fieldOptions, sx: { ...fieldSX, maxWidth: component.maxWidth } } : { sx: fieldSX, options: fieldOptions };

  return (
    <DynamicField
      field={field}
      control={control}
      {...props}
    />
  )
}

type ADataField = {
  component: LayoutField;
  field: Record<string, any>;
  baseAppearance?: BaseAppearance;
}
const ADataField: FC<ADataField> = ({ component, field, baseAppearance }) => {
  const fieldSX = createFieldSX(baseAppearance, component.appearance, component.type);

  // Get the field options from the meta field options
  const fieldOptions = getMetaFieldOptions(baseAppearance, component.appearance, component.type as DataFieldTypes);

  // if the component has a maxWidth, set it in the props
  // otherwise, just pass the options
  const props = component.maxWidth ? { options: fieldOptions, sx: { ...fieldSX, maxWidth: component.maxWidth } } : { sx: fieldSX, options: fieldOptions };
  const style = createFieldStyle(baseAppearance, component.appearance, component.type as DataFieldTypes);

  if (field.type === FIELD_TYPES.CLUSTER) {
    return <ClusterTable field={field as any} />;
  }

  // Default to the FieldValue component if no custom component is passed in
  const ValueComponent = fieldOptions?.fieldValueComponent || DataValue;
  return (
    <div style={style} className={`${field.id}-field` + (field.className ? ` ${field.className}` : '')}>
      <Typography variant="detailItem" className={`label ${field.id}-label`}>{field.label}: </Typography>
      <ValueComponent field={field} {...props} />
    </div>
  );
}

/**
 * @function FieldValue
 * @param {object} props
 * @param {object} props.field - field object to render
 * @returns {React.ReactElement} - returns rendered field
 * @description Render the value of a field
 */
type DataValueProps = {
  field: Record<string, any>;
  options?: any;
  sx?: SxProps;
}

export const DataValue: FC<DataValueProps> = ({ field, options, sx, ...props }) => {
  // Default to the LinkValue component if no custom component is passed in
  const LinkComponent = options?.linkComponent || LinkValue;
  const isEmpty = field.empty === field.value;
  const className = `${field.id}-value`;
  if (!isEmpty && (field.type === FIELD_TYPES.LINK || (field.renderAsLinks && field.value))) {
    const links = Array.isArray(field.value) ? field.value : [field.value];
    return (
      <>
        {links.map((link, index) => (
          <LinkComponent key={index} field={field} link={link} index={index} className={className} sx={sx} {...props} />
        ))}
      </>
    );
  }
  return <Typography variant="detailItem" className={className} sx={sx} {...props}>{field.value?.toString()}</Typography>;
};


export type ColumnsProps = SharedLayoutPartsProps & {
  columns: LayoutColumn[];
}

export const Columns: FC<ColumnsProps> = ({ columns, ...props}) => {
  // loop through the columns and render using MUI Grid
  const spacing = { xs: 1, sm: 2, md: 4 };
  return (
    <Grid container spacing={spacing}>
      {columns.map((column: LayoutColumn, index: number) => {
        // prop size is a string that will be used to set the width of the column
        const gridProps = {
          [column.size]: column.width
        }

        return (
          <Grid key={index} {...gridProps}>
            <LayoutComponents components={column.components} {...props} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export type LayoutComponentProps =  SharedLayoutPartsProps & {
  components: LayoutComponent[];
}

export const LayoutComponents: FC<LayoutComponentProps> = ({ components, ...props }) => {
  return (
    <>
      {components.map((component: LayoutComponent, index: number) => {
        if (!component) {
          return null;
        }
        const key = (component?.key ?? 'layoutComponent') + index;
        return (
          <RenderedLayoutComponent
            key={key}
            component={component}
            index={index}
            {...props}
          />
        );
      })}
    </>
  );
}

export type LayoutContainerComponentProps = SharedLayoutPartsProps & {
  component: LayoutContainer;
}

export const LayoutContainerComponent: FC<LayoutContainerComponentProps> = ({ component, ...props }) => {
  const wrapperSX = createSX(props.baseAppearance, component.appearance, 'container');
  return <Box sx={wrapperSX}>
    <LayoutComponents components={component.components} {...props} />
  </Box>
}

export type PanelHeaderProps = {
  component: LayoutPanel;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  baseAppearance?: BaseAppearance;
  icon?: ReactNode;
}

export type PanelWrapperSXNames = 'header' | 'description';
export type PanelTextSXNames = 'headerText' | 'descriptionText';
export type PanelThemeNames = 'layoutPanelHeaderContainer' | 'layoutPanelDescriptionContainer';
export const usePanelSX = (
  baseAppearance: BaseAppearance | undefined, componentAppearance: PanelAppearance | undefined,
  wrapperName: PanelWrapperSXNames, textName: PanelTextSXNames, themeName: PanelThemeNames
) => {
  const theme = useTheme();
  const layoutPanelHeaderContainer = theme[themeName] || {};
  const panelBaseAppear = (baseAppearance?.panel ?? {}) as PanelAppearance;
  const panelCompAppear = componentAppearance ?? {};

  const headerBaseAppear = panelBaseAppear[wrapperName]?.sx ?? {};
  const headerCompAppear = panelCompAppear[wrapperName]?.sx ?? {};

  const textBaseAppear = panelBaseAppear[textName] ?? {};
  const textCompAppear = panelCompAppear[textName] ?? {};
  const variant = textBaseAppear.variant ?? textCompAppear.variant ?? null;
  // return the merged options
  // component level will override base level, which will override theme level
  const wrapperSX = { flexGrow: 1, ...layoutPanelHeaderContainer, ...headerBaseAppear, ...headerCompAppear } as SxProps;
  const textSX = { ...textBaseAppear?.sx, ...textCompAppear?.sx } as SxProps;

  return { wrapperSX, textSX, variant };
}

export const PanelHeader: FC<PanelHeaderProps> = ({ component, expanded, setExpanded, baseAppearance, icon }) => {
  const { wrapperSX, textSX, variant } = usePanelSX(baseAppearance, component.appearance, 'header', 'headerText', 'layoutPanelHeaderContainer')
  const { collapsible, title } = component;

  const renderExpandIcon = () => {
    if (!collapsible) {
      return null;
    }

    return (
      <ExpandMore
        expand={!!expanded}
        onClick={
          () => {
            if (setExpanded) {
              setExpanded(!expanded)
            }
          }}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    );
  };

  return (
    <Box sx={wrapperSX}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={textSX} variant={variant ?? 'panelHeader'}>{icon}{title}</Typography>
        {renderExpandIcon()}
      </Stack>
    </Box>
  );
}

export type PanelDescriptionProps = {
  component: LayoutPanel;
  baseAppearance?: BaseAppearance;
}

export const PanelDescription: FC<PanelDescriptionProps> = ({ component, baseAppearance }) => {
  const { wrapperSX, textSX, variant } = usePanelSX(baseAppearance, component.appearance, 'description', 'descriptionText', 'layoutPanelDescriptionContainer');

  if (!component.description) {
    return null;
  }

  return (
    <Box sx={wrapperSX}>
      <Typography sx={textSX} variant={variant ?? 'panelDescription'}>{component.description}</Typography>
    </Box>
  );
}

export type PanelComponentProps = SharedLayoutPartsProps & {
  component: LayoutPanel;
  headerProps?: PanelHeaderProps;
  index?: number;
}
export const PanelComponent: FC<PanelComponentProps> = ({ component, index, headerProps, ...props }) => {
  // do not allow the panel to be collapsed if it is not set to be collapsible
  const collapsed = component.collapsible && component.collapsed;
  const [expanded, setExpanded] = useState<boolean>(!collapsed);
  const sx: SxProps = { position: 'relative' };
  if (index) {
    sx.marginTop = '16px';
  }
  const { collapsible } = component;
  const renderContent = () => {
    if (collapsible) {
      return (
        <Collapse in={expanded} timeout="auto">
          <PanelContent component={component} {...props} />
        </Collapse>
      );
    }
    return <PanelContent component={component} {...props} />;
  }

  return (
    <Card sx={sx}>
      <PanelHeader component={component} expanded={expanded} setExpanded={setExpanded} baseAppearance={props.baseAppearance} {...headerProps} />
      <PanelDescription component={component} baseAppearance={props.baseAppearance} />
      {component.addContentDivider && <Divider />}
      {renderContent()}
    </Card>
  );
}

export type PanelContentProps = SharedLayoutPartsProps & {
  component: LayoutPanel;
}

export const PanelContent: FC<PanelContentProps> = ({ component, ...props }) => {
  return (
    <CardContent>
      <LayoutComponents components={component.components} {...props} />
    </CardContent>
  );
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  ...theme.iconButton,
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));