import { type ReactNode, type FC} from 'react';
import { Card, CardContent, Divider, type SxProps } from '@mui/material';
import Expandable, { type ExpandableProps } from '@components/Expandable';
import { PanelHeader, type PanelHeaderProps } from './LayoutParts';
import { LAYOUT_TYPES, type PanelAppearance } from '@models/layout.model';

const cardSxOverrides: SxProps = {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}

export interface DataPanelProps extends ExpandableProps {
  title: string;
  expandable?: boolean;
  headerProps?: Partial<PanelHeaderProps>;
}

const DataPanel: FC<DataPanelProps> = ({ title, expandable, headerProps, children, unmountOnExit, ...props }) => {
  if (expandable) {
    return (
      <Expandable unmountOnExit={unmountOnExit} title={title} headerProps={headerProps} {...props}>
        <DataPanelContent>
          {children ?? children}
        </DataPanelContent>
      </Expandable>
    )
  }

  return (
    <div {...props}>
      <DataPanelHeader collapsible={false} title={title} {...headerProps} />
      <DataPanelContent>
        {children}
      </DataPanelContent>
    </div>
  )
}

export const getDataPanelHeaderApperance = (expanded: boolean, borderRadius: string | number, appearance?: PanelAppearance): PanelAppearance => {
  return {
    ...appearance,
    header: {
      sx: {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: expanded ? 0 : borderRadius,
        borderBottomRightRadius: expanded ? 0 : borderRadius,
        ...appearance?.sx
      }
    }
  }
};

export interface DataPanelHeaderProps extends Omit<PanelHeaderProps, 'component'> {
  collapsible?: boolean;
  title: string;
  borderRadius?: string | number;
  appearance?: PanelAppearance;
}

export const DataPanelHeader: FC<DataPanelHeaderProps> = ({ collapsible = true, title, borderRadius = '5px', appearance, ...props }) => {
  let isExAppearance = props.expanded;
  if (!collapsible) {
    isExAppearance = true;
  }

  const finalAppearance: PanelAppearance = getDataPanelHeaderApperance(isExAppearance ?? true, borderRadius, appearance);

  return (
    <PanelHeader
      component={{
        title,
        collapsible,
        type: LAYOUT_TYPES.panel,
        key: 'header',
        appearance: finalAppearance,
        components: [] // Add the 'components' property here
      }}
      {...props}
    />
  )
}

export const DataPanelContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Divider />
      <Card sx={cardSxOverrides}>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </>
  )
}

export default DataPanel;