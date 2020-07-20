import React from "react";
import Upload from "../components/Upload/Upload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRol } from "../redux/seriesDucks";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

function Settings() {
  const dispatch = useDispatch();

  const rol = useSelector((store) => store.series.rol.rol);

  React.useEffect(() => {
    const verify = () => {
      axios
        .post(
          `https://us-central1-koonga.cloudfunctions.net/api/auth/verify`,
          {
            id: localStorage.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((data) => {
          dispatch(setRol(data.data.rol));
        })
        .catch((error) => {
          dispatch(setRol("error"));
        });
    };
    verify();
  }, [dispatch]);
  return (
    <div>
      {rol === "admin" ? (
        <Upload />
      ) : !localStorage.token && !localStorage.name ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>
            No se puede visualizar esta página, debes iniciar sesión primero
            para verificar tu identidad.
          </h1>
        </Grid>
      ) : rol === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>
            No cuentas con los permisos necesarios para ingresar a este
            apartado.
          </h1>
        </Grid>
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>Verificando permisos.</h1>
          <div
            style={{
              width: "100%",
              "& > * + *": {
                marginTop: "10%",
              },
            }}
          >
            <LinearProgress color="secondary" />
          </div>
        </Grid>
      )}
    </div>
  );
}

export default Settings;
