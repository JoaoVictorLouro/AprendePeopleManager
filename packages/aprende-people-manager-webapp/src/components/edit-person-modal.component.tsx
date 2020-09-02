import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  useTheme,
  DialogActions,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { InferType, object, string } from "yup";
import clsx from "clsx";
import { createPerson, updatePerson } from "../services/people.service";
import { usePeopleListState } from "../state/people-list.state";
import { useSnackbar } from "notistack";

const useEditPersonModalStyles = makeStyles((theme) => ({
  ActionContainer: {
    width: "100%",
    textAlign: "right",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  ActionContainerMobile: {
    "& button": {
      marginTop: theme.spacing(3),
    },
  },
}));

export const EditPersonModal: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { selectedPerson, selectPerson } = usePeopleListState();
  const { ActionContainer, ActionContainerMobile } = useEditPersonModalStyles();
  const validationSchema = useMemo(() => {
    return object({
      firstName: string().label("First Name").required().max(128),
      lastName: string().label("Last Name").required().max(128),
    }).required();
  }, []);

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = selectedPerson || {
    firstName: "",
    lastName: "",
  };

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));

  const onSubmit = async (values: FormValues) => {
    if (selectedPerson?.id) {
      try {
        await updatePerson(values);
        enqueueSnackbar("Person updated succesfully!", {
          variant: "success",
        });
        selectPerson(null);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(
          "There was an issue updating the person, please try again shortly...",
          {
            variant: "error",
          }
        );
        throw e;
      }
    } else {
      try {
        await createPerson(values);
        enqueueSnackbar("Person updated succesfully!", {
          variant: "success",
        });
        selectPerson(null);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(
          "There was an issue saving the new person, please try again shortly...",
          {
            variant: "error",
          }
        );
        throw e;
      }
    }
  };

  const onCancel = () => {
    selectPerson(null);
  };

  return (
    <Dialog open={Boolean(selectedPerson)} fullScreen={isMobile} fullWidth>
      <DialogTitle>
        {selectedPerson?.id
          ? `Edit person: ${selectedPerson?.id}`
          : "Add new person"}
      </DialogTitle>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleBlur, handleChange, errors, isSubmitting, isValid }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={initialValues.firstName}
                    label={validationSchema.fields.firstName.describe().label}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={initialValues.lastName}
                    label={validationSchema.fields.lastName.describe().label}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <div
                className={clsx(
                  ActionContainer,
                  isMobile && ActionContainerMobile
                )}
              >
                <Button
                  type="button"
                  fullWidth={isMobile}
                  size={isMobile ? "large" : "medium"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth={isMobile}
                  size={isMobile ? "large" : "medium"}
                  disabled={isSubmitting || !isValid}
                >
                  Save
                </Button>
              </div>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
