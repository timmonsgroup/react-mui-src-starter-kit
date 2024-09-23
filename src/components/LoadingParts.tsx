import { Card } from "@mui/material";
import { LineLoader, SectionTop } from "@timmons-group/shared-react-components";
import { FC } from "react";

type PageErrorProps = {
  title?: string;
  error?: string;
}
const PageError: FC<PageErrorProps> = ({title = 'Error', error}) => {

  return (
    <Card>
      <SectionTop title={title} description={error} />
    </Card>
  );
}

type PageLoadingProps = {
  message?: string;
}

const PageLoading: FC<PageLoadingProps> = ({message}) => {
  return (
    <Card>
      <LineLoader message={message ?? 'Loading'} />
    </Card>
  );
}

export {
  PageError,
  PageLoading
}