import { FC } from "react";
import { calcMultiply, calcSum, CalcSumFormat } from "@helpers/helpers";
import { LAYOUT_TYPES, LayoutCustomComponent } from "@models/layout.model";
import { Box, Typography } from "@mui/material";
import { currencyFormatter } from "@timmons-group/shared-react-components";

export type SummaryDefMeta = {
  title: string;
  fieldsToSum?: any[];
  fieldsToMultiply?: any[];
  format: CalcSumFormat;
}

export type SummaryCustomComponent = LayoutCustomComponent & {
  appearance: {
    meta: SummaryDefMeta;
  }
}

export const createSummaryDef = (
  key: string, title: string, fieldsToSum: any[], fieldsToMultiply: any[], format: CalcSumFormat = 'number'
): SummaryCustomComponent => {
  return {
    type: LAYOUT_TYPES.customComponent,
    key,
    appearance: {
      meta: {
        title,
        fieldsToSum,
        fieldsToMultiply,
        format,
      } as SummaryDefMeta
    }
  }
}

export type SummaryWidgetProps = {
  component: SummaryCustomComponent,
  data: Record<string, any>
}

export const SummaryWidget: FC<SummaryWidgetProps> = ({ component, data }) => {
  const summaryMeta: SummaryDefMeta = component.appearance?.meta;
  console.log('SummaryWidget', data);
  if (!summaryMeta) {
    return null;
  }

  const { title, fieldsToSum, fieldsToMultiply, format } = summaryMeta;
  const calcValue = fieldsToMultiply?.length ? calcMultiply(fieldsToMultiply ?? [], data, format) : calcSum(fieldsToSum ?? [], data, format);
  const displayValue = format === 'currency' ? currencyFormatter(calcValue.toString()) : calcValue;
  return (
    <Box sx={{ border: '1px solid #BCBCBC', borderRadius: '5px', padding: '8px', textAlign: 'center' }}>
      <Typography variant="summaryValue">{displayValue}</Typography>
      <Typography variant="summaryTitle">{title}</Typography>
    </Box>
  );
}