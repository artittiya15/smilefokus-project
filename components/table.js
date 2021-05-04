import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#0000008a',
        color: 'white',
        fontWeight: 'blod',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

//cal
function sumTran(items) {
    return items.map(({ totaltransaction }) => totaltransaction).reduce((sum, i) => sum + i, 0);
}
function sumAmount(items) {
    return items.map(({ totalamount }) => totalamount).reduce((sum, i) => sum + i, 0);
}
function sumRemainPoint(items) {
    return items.map(({ remainingpoint }) => remainingpoint).reduce((sum, i) => sum + i, 0);
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables(props) {
    const rows = props.rows;
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const slicedData = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    var sumTranNo = sumTran(slicedData);
    var sumAmountNo = sumAmount(slicedData);
    var sumRemainPointNo = sumRemainPoint(slicedData);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        sumTranNo = sumTran(slicedData);
        sumAmountNo = sumAmount(slicedData);
        sumRemainPointNo = sumRemainPoint(slicedData);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ width: 250 }}>Name</StyledTableCell>
                        <StyledTableCell style={{ width: 150 }}>Tier</StyledTableCell>
                        <StyledTableCell style={{ width: 150 }}>Phone</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'right', width: 130 }}>Total Trans.</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'right', width: 200 }}>Total Amount</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'right', width: 200 }}>Remaining Point</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                        (row) => (
                            <StyledTableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.customername}
                                </TableCell>
                                <TableCell>{row.customertier}</TableCell>
                                <TableCell>{row.customerphone}</TableCell>
                                <TableCell align="right">{row.totaltransaction}</TableCell>
                                <TableCell align="right">{row.totalamount.toLocaleString('en-US')}</TableCell>
                                <TableCell align="right">{row.remainingpoint.toLocaleString('en-US')}</TableCell>
                            </StyledTableRow>
                        )
                    )}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            //rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            rowsPerPageOptions={[]}
                            colSpan={12}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                    <TableRow>
                        <TableCell
                            colSpan={3}
                            style={{ color: '#ffa640', fontSize: '18px', fontWeight: 'bold', borderStyle: 'hidden' }}
                        >
                            Total
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{ color: '#ffa640', fontSize: '18px', fontWeight: 'bold', borderStyle: 'hidden' }}
                        >
                            {sumTranNo}
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{ color: '#ffa640', fontSize: '18px', fontWeight: 'bold', borderStyle: 'hidden' }}
                        >
                            {sumAmountNo.toLocaleString('en-US')}
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{ color: '#ffa640', fontSize: '18px', fontWeight: 'bold', borderStyle: 'hidden' }}
                        >
                            {sumRemainPointNo.toLocaleString('en-US')}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
