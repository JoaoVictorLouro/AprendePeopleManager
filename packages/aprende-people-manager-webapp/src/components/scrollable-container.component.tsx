import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useScrollableContainerStyles = makeStyles({
  ScrollableContainer: {
    width: "100vw",
    height: "100%",
    overflowY: "auto",
  },
});

export type ScrollableContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className,
  ...divProps
}) => {
  const { ScrollableContainer } = useScrollableContainerStyles();
  return (
    <div className={clsx(ScrollableContainer, className)} {...divProps}>
      {children}
    </div>
  );
};
