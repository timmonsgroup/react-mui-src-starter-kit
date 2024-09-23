// Render typography components from an array of objects
import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

type TypographyArrayProps = TypographyProps & {
  items: string[];
  isError?: boolean;
}

/**
 * @param {Array} items - An array of strings to render as Typography components
 * @param {boolean} [isError] - If true, render the Typography components as error text
 * @returns {Array} - An array of Typography components
 * @example
 * const items = ['Item 1', 'Item 2', 'Item 3'];
 * <TypographyArray items={items} />
 *
 * <Typeography>Item 1</Typography>
 * <Typeography>Item 2</Typography>
 * <Typeography>Item 3</Typography>
 **/
const TypographyArray: FC<TypographyArrayProps> = ({ items, isError, ...props }) => {
  return Array.isArray(items) ? items?.map((item, index) => {
    return <Typography color={isError ? 'error' : ''} key={index} {...props} >{item}</Typography>;
  }) : null;
}

export default TypographyArray;