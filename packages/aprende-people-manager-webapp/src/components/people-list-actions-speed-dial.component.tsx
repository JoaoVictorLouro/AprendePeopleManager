import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import { makeStyles, Backdrop } from "@material-ui/core";
import { generateStrangers } from "../services/people.service";
import { usePeopleListState } from "../state/people-list.state";
import { useSnackbar } from "notistack";

const useListActionsSpeedDialStyles = makeStyles((theme) => ({
  InlineContainer: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 3,
  },
  InlineContainerBackdrop: {
    zIndex: 2,
  },
  Tooltip: {
    minWidth: "9rem",
  },
  ActionsClosedContainer: {
    display: "none",
  },
}));

export const PeopleListActionsSpeedDial: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const {
    Tooltip,
    InlineContainer,
    InlineContainerBackdrop,
    ActionsClosedContainer,
  } = useListActionsSpeedDialStyles();
  const { selectPerson } = usePeopleListState();

  const onGenerateStrangersClick = async () => {
    try {
      await generateStrangers();
      enqueueSnackbar("Strangers generated succesfully!", {
        variant: "success",
      });
      selectPerson(null);
    } catch (e) {
      enqueueSnackbar(
        "Failed to generate strangers, please try again shortly!",
        {
          variant: "error",
        }
      );
      console.error(e);
    }
  };

  const onCreatePersonClick = async () => {
    selectPerson({
      firstName: "",
      lastName: "",
    });
  };

  const toggleOpen = () =>
    setOpen((v) => {
      return !v;
    });

  return (
    <>
      <Backdrop
        className={InlineContainerBackdrop}
        open={isOpen}
        onClick={toggleOpen}
      />
      <div className={InlineContainer}>
        <SpeedDial
          ariaLabel="Create people"
          icon={<SpeedDialIcon />}
          onClick={toggleOpen}
          open={isOpen}
          classes={{
            actionsClosed: ActionsClosedContainer,
          }}
        >
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle={"Add new person"}
            onClick={onCreatePersonClick}
            classes={{
              staticTooltipLabel: Tooltip,
            }}
            tooltipOpen
          />
          <SpeedDialAction
            icon={<PeopleIcon />}
            tooltipTitle={"Generate strangers"}
            onClick={onGenerateStrangersClick}
            classes={{
              staticTooltipLabel: Tooltip,
            }}
            tooltipOpen
          />
        </SpeedDial>
      </div>
    </>
  );
};
