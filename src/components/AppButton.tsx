// New a component to extend MUI button and add our own styles
// This was far easier than trying to duplicate the MUI contained button styles in a variant
import {
  Button,
  type ButtonProps,
} from '@mui/material'
import { type FC, type ComponentProps } from 'react'

// create a type for the props. The rest props should be of type ButtonProps
export type AppButtonProps = ButtonProps & ComponentProps<typeof Button>

export const AppButton: FC<AppButtonProps> = ({ sx = {}, ...props }) => {
  return (
    <Button
      size="small"
      sx={{
        ...sx,
        borderRadius: 28,
        padding: '2px 16px',
        fontSize: '14px',
      }}
      {...props}
    />
  )
}
