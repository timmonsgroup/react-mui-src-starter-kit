import { type FC, type ReactNode, type HTMLAttributes, useState } from "react";
import Collapse from '@mui/material/Collapse';
import { type PanelAppearance } from "@models/layout.model";
import { PanelHeaderProps } from "./LayoutParts";
import { DataPanelHeader, getDataPanelHeaderApperance } from "./DataPanel";

export type ExpandableProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  borderRadius?: string | number;
  isExpanded?: boolean;
  unmountOnExit?: boolean; // if true, the children will be unmounted when collapsed Set false if this is a form otherwise the form fields will lose their values
  hideFromPrint?: boolean;
  appearance?: PanelAppearance;
  headerProps?: Partial<PanelHeaderProps>;
  children: ReactNode;
}

const Expandable: FC<ExpandableProps> = ({
  children, title, isExpanded, hideFromPrint = true, unmountOnExit = true, borderRadius = '5px', appearance, headerProps, ...props
}) => {
  const [expanded, setExpanded] = useState(isExpanded ?? true);
  // if hideFromPrint is true, add the class name to the div
  const className = hideFromPrint && !expanded ? 'no-print' : '';

  const finalAppearance: PanelAppearance = getDataPanelHeaderApperance(expanded, borderRadius, appearance);

  return (
    <div className={className} {...props}>
      <DataPanelHeader title={title} collapsible={true} appearance={finalAppearance} expanded={expanded} setExpanded={setExpanded} {...headerProps} />
      <Collapse in={expanded} timeout="auto" unmountOnExit={unmountOnExit}>
        {children}
      </Collapse>
    </div>
  );
}

export default Expandable;