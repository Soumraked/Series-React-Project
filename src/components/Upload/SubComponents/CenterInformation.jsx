import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

import TextField from "@material-ui/core/TextField";
import ChipSelector from "./ChipSelector";

function CenterInformation({ addGenres, genres }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            <TextField
              label="Nombre"
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
            />
          </Typography>

          <Divider style={{ margin: 10 }} variant="middle" />
          <ChipSelector addGenres={addGenres} genres={genres} />
          <Divider style={{ marginBottom: 10 }} variant="middle" />
          <Typography gutterBottom variant="h6" component="h5">
            Sinopsis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h6">
            <TextField
              label="Sinopsis"
              color="secondary"
              multiline
              style={{ width: "100%" }}
              rows={7}
              variant="outlined"
            />
          </Typography>
          <Divider style={{ marginTop: 20 }} variant="middle" />
        </CardContent>
      </Card>
    </div>
  );
}

export default CenterInformation;
