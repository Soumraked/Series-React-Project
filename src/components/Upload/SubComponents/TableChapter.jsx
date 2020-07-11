import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DialogDelete from "./DialogDeleteRows";
import DialogDeleteAll from "./DialogDeleteAllRows";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const columns = [
  { id: "num", label: "Número", minWidth: 100 },
  { id: "url", label: "Link capítulos", minWidth: 100 },
  { id: "modify", label: "Modificar", minWidth: 50 },
  { id: "delete", label: "Eliminar", minWidth: 50 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  large: {
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  short: {
    marginBottom: 10,
    marginTop: 10,
    width: "10%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export default function StickyHeadTable({
  rows,
  addRows,
  value,
  handleChange,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [numero, setNumero] = useState("");
  const [urlChapter, setUrlChapter] = useState("");
  const [openModify, setOpenModify] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModify = (num, url) => {
    setNumero(num);
    setUrlChapter(url);
    setOpenModify(true);
    console.log("Modify " + num);
  };

  const handleModifyCancel = () => {
    setOpenModify(false);
  };

  const handleDelete = () => {
    let respRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].num !== deleteVar) {
        respRows.push(rows[i]);
      }
    }
    addRows(respRows);
    setOpen(false);
  };

  const handleDeleteAll = () => {
    addRows([]);
    setOpenAll(false);
  };

  const [open, setOpen] = React.useState(false);
  const [openAll, setOpenAll] = React.useState(false);

  const [deleteVar, setDeleteVar] = useState("");

  const handleClickOpen = (value) => {
    setDeleteVar(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAll = () => {
    setOpenAll(false);
  };

  const saveModify = () => {
    let respRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].num === numero) {
        respRows.push({ num: numero, url: urlChapter });
      } else {
        respRows.push(rows[i]);
      }
    }
    addRows(respRows);
    setOpenModify(false);
  };

  return (
    <div style={{ margin: 20 }}>
      {openModify && (
        <div>
          <h1>Editar campos</h1>
          <TextField
            value={numero}
            label="Número"
            color="secondary"
            className={classes.short}
            disabled
          />
          <TextField
            value={urlChapter}
            label="Url del capítulo"
            color="secondary"
            className={classes.large}
            onChange={(event) => setUrlChapter(event.target.value)}
          />
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              style={{
                margin: 20,
              }}
              variant="outlined"
              onClick={() => {
                handleModifyCancel();
              }}
            >
              Cancelar edición
            </Button>
            <Button
              style={{
                margin: 20,
              }}
              variant="outlined"
              onClick={() => {
                saveModify();
              }}
            >
              Editar campo
            </Button>
          </Grid>
        </div>
      )}

      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <h1>Ingreso de episodios</h1>
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <FormControl component="fieldset">
          <RadioGroup value={value} onChange={handleChange} row>
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Ingreso manual"
            />
            <FormControlLabel
              value="iterativo"
              control={<Radio />}
              label="Ingreso iterativo"
            />
            <FormControlLabel
              value="file"
              control={<Radio />}
              label="Ingreso mediante archivo de texto"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {rows.length > 0 ? (
        <Paper className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <h1>Listado de episodios</h1>
            <Button
              style={{
                margin: 20,
              }}
              variant="outlined"
              onClick={() => {
                setOpenAll(true);
              }}
            >
              Eliminar campos
            </Button>
          </Grid>

          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.num}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "modify" ? (
                                <IconButton
                                  onClick={() => handleModify(row.num, row.url)}
                                >
                                  <EditIcon />
                                </IconButton>
                              ) : column.id === "delete" ? (
                                <IconButton
                                  // onClick={() => handleDelete(row.num)}
                                  onClick={() => handleClickOpen(row.num)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <DialogDelete
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
          <DialogDeleteAll
            openAll={openAll}
            handleCloseAll={handleCloseAll}
            handleDeleteAll={handleDeleteAll}
          />
        </Paper>
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>Aquí se visualizarán el listado de episodios.</h1>
        </Grid>
      )}
    </div>
  );
}
