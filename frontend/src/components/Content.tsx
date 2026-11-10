// Wrapper for all page content, provides propper padding from navigation
import { Box, Toolbar } from "@mui/material";
import { PropsWithChildren } from "react";

type ContentProps = PropsWithChildren<{}>;

const Content = ({ children }: ContentProps) => {
  return (
    <Box sx={{ paddingLeft: "240px" }}>
      <Toolbar />
      {children}
    </Box>
  );
};

export default Content;
