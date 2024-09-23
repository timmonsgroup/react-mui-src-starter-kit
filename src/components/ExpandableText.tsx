import { type FC, useState } from 'react';
import { Typography, Button, TypographyProps } from '@mui/material';

interface ExpandableTextProps extends TypographyProps {
  maxChars: number;
  text: string;
}

const ExpandableText: FC<ExpandableTextProps> = ({ maxChars, text, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + '...' : text;

  return (
    <div>
      <Typography style={{ whiteSpace: "pre-line" }} {...props}>
        {isExpanded ? text : truncatedText}
      </Typography>
      {text.length > maxChars && (
        <Button size="small" onClick={handleToggle}>
          {isExpanded ? 'Less' : 'More'}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;