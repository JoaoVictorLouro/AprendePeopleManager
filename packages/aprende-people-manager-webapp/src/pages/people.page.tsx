import React from "react";
import { Container } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { ScrollableContainer } from "../components/scrollable-container.component";
import { PeopleListActionsSpeedDial } from "../components/people-list-actions-speed-dial.component";
import { WithPeopleListState } from "../state/people-list.state";
import { PeopleList } from "../components/people-list.component";
import { EditPersonModal } from "../components/edit-person-modal.component";

export const PeoplePage: React.FC = () => {
  return (
    <WithPeopleListState>
      <Helmet>
        <title>People - Aprender People Manager</title>
      </Helmet>
      <ScrollableContainer>
        <Container>
          <PeopleList />
          <PeopleListActionsSpeedDial />
        </Container>
        <EditPersonModal />
      </ScrollableContainer>
    </WithPeopleListState>
  );
};
