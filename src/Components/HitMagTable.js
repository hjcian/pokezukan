import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { attributes } from '../constants/const'

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
}))

const HitMagTable = ({ hitMagnification }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Our Attribute</TableCell>
            <TableCell align='center'>Anemy Attribute 1</TableCell>
            <TableCell align='center'>Anemy Attribute 2</TableCell>
            <TableCell align='center'>Hit magnification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hitMagnification.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align='center' component='th' scope='row'>
                {attributes[row.ourAttr]}
              </TableCell>
              <TableCell align='center'>{row.mag1}</TableCell>
              <TableCell align='center'>{row.mag2}</TableCell>
              <TableCell align='center'>{row.hitMag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default HitMagTable
