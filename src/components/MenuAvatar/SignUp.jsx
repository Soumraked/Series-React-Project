import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormHelperText from "@material-ui/core/FormHelperText";

import Avatar from "@material-ui/core/Avatar";

import axios from "axios";

function getSteps() {
  return [
    "Introduce tu nombre de usuario y contraseña.",
    "Validando datos",
    "Bienvenido a Kooga",
  ];
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function CustomizedDialogs({ open, handleClose }) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [messageName, setMessageName] = React.useState("");
  const [messagePass, setMessagePass] = React.useState("");

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        setActiveStep(1);
        setMessageName("");
        setMessagePass("");
        axios
          .post(
            `https://us-central1-koonga.cloudfunctions.net/api/auth/signup`,
            {
              id: nick,
              password: values.password,
            }
          )
          .then((data) => {
            console.log(data.data.token);
            localStorage.token = data.data.token;
            localStorage.name = nick;
            setNick("");
            setValues({ ...values, password: "" });
            setActiveStep(2);
          })
          .catch((error) => {
            switch (error.request.status) {
              case 409:
                setMessageName("El nombre de usuario ya está utilizado.");
                if (values.password.length === 0) {
                  setMessagePass("La contraseña no puede estar vacia.");
                }
                break;
              case 500:
                if (nick.length === 0) {
                  setMessageName("El nombre de usuario no puede estar vacio.");
                }
                if (values.password.length === 0) {
                  setMessagePass("La contraseña no puede estar vacia.");
                }
                if (nick.length !== 0 && values.password.length !== 0) {
                  if (values.password.length < 6) {
                    setMessagePass(
                      "La contraseña debe tener al menos 6 caracteres."
                    );
                  } else {
                    setMessageName(
                      "Error desconocido, verifique los datos antes de continuar."
                    );
                    setMessagePass(
                      "Error desconocido, verifique los datos antes de continuar."
                    );
                  }
                }
                break;
              default:
                setMessageName(
                  "Error desconocido, verifique los datos antes de continuar."
                );
                setMessagePass(
                  "Error desconocido, verifique los datos antes de continuar."
                );
                break;
            }
            setActiveStep(0);
          });

        break;
      case 1:
        console.log("Wait.");
        break;
      case 2:
        handleClose();
        setActiveStep(0);
        break;
      default:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
    }
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const [nick, setNick] = React.useState("");

  const handleNick = (event) => {
    setNick(event.target.value);
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        onClose={() => {
          handleClose();
          setActiveStep(0);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => {
            handleClose();
            setActiveStep(0);
          }}
        >
          Crear cuenta
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{ paddingBottom: 0 }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <div className={classes.instructions}>
                {activeStep === 0 ? (
                  <Grid item xs={12}>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      style={{
                        width: "95%",
                        marginBottom: 30,
                      }}
                    >
                      <TextField
                        id="standard-required"
                        label="Nombre de usuario"
                        color="secondary"
                        value={nick}
                        onChange={(event) => {
                          handleNick(event);
                        }}
                        autoComplete="off"
                        error={messageName !== ""}
                        helperText={messageName}
                      />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      style={{ width: "95%", marginBottom: 30 }}
                      error={messagePass !== ""}
                    >
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        color="secondary"
                      >
                        Contraseña
                      </InputLabel>
                      <Input
                        error={messagePass !== ""}
                        color="secondary"
                        id="pass-error"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="pass-error">
                        {" "}
                        {messagePass}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                ) : activeStep === 1 ? (
                  <div className={classes.progress}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      style={{ marginBottom: 20, marginTop: 20 }}
                    >
                      <CircularProgress color="secondary" />
                    </Grid>
                  </div>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginBottom: 30 }}
                  >
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Typography>Bienvenido a Kooga</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Avatar
                        alt="Kooga"
                        src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                        className={classes.large}
                      />
                    </Grid>
                  </Grid>
                )}

                <div>
                  {/* {[0, 1].indexOf(activeStep) !== -1 && (
                    <Button
                      disabled={
                        activeStep === 0 || activeStep === steps.length - 1
                      }
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Anterior
                    </Button>
                  )} */}
                  {[0, 2].indexOf(activeStep) !== -1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
