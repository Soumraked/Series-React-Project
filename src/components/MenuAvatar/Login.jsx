import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
}));

export default function CustomizedDialogs({ open, handleClose }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [messageName, setMessageName] = React.useState("");
  const [messagePass, setMessagePass] = React.useState("");
  const [charge, setCharge] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [nick, setNick] = React.useState("");

  const handleNick = (event) => {
    setNick(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post(`https://us-central1-koonga.cloudfunctions.net/api/auth/login`, {
        id: nick,
        password: values.password,
      })
      .then((data) => {
        localStorage.token = data.data.token;
        localStorage.name = data.data.name;
        localStorage.rol = data.data.rol + "|admin3";
        setNick("");
        setValues({ ...values, password: "" });
        setMessageName("");
        setMessagePass("");
        handleClose();
        setCharge(false);
      })
      .catch((error) => {
        setMessageName("");
        setMessagePass("");
        console.log(error.request);
        switch (error.request.status) {
          case 500:
            if (nick.length === 0) {
              setMessageName("El nombre de usuario no puede estar vacio.");
            }
            if (values.password.length === 0) {
              setMessagePass("La contraseña no puede estar vacia.");
            }
            if (nick.length !== 0 && values.password.length !== 0) {
              setMessageName(" ");
              setMessagePass(
                "Las credenciales no coinciden, intenta nuevamente."
              );
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
        setCharge(false);
      });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Iniciar sesión
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                style={{
                  width: "95%",
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
                  error={messageName !== ""}
                  helperText={messageName}
                  autoComplete="off"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                style={{ width: "95%" }}
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
                <FormHelperText id="pass-error"> {messagePass} </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setCharge(true);
              handleLogin();
            }}
          >
            {charge ? (
              <CircularProgress
                color="secondary"
                style={{ width: "50%", height: "50%" }}
              />
            ) : (
              "Ingresar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
