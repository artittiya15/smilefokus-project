import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Table from './../components/table';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        fontWeight: 'bold',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    hilight: {
        color: '#ffa640',
        fontWeight: 'bold',
        fontSize: '22px',
    },
    hilight2: {
        color: '#ffa640',
        fontWeight: 'bold',
        fontSize: '18px',
    },
    hilight3: {
        color: 'white',
        fontSize: '14px',
    },
    headerCommand: {
        display: 'flex',
    },
    headerCommandColor: {
        backgroundColor: '#ffa640',
        marginLeft: '6px',
    },
    headerCommandColor2: {
        backgroundColor: '#ffa640',
        marginLeft: '6px',
        opacity: '0.5',
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

function createData(id, customername, customertier, customerphone, totaltransaction, totalamount, remainingpoint) {
    return { id, customername, customertier, customerphone, totaltransaction, totalamount, remainingpoint };
}

export default function Home() {
    const [rows, setRows] = useState([]);
    const [data, setData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        fetch('api/bi-member')
            .then((res) => res.json())
            .then(
                (result) => {
                    let tmp = [];
                    result.data.list.map((x, id) =>
                        tmp.push(
                            createData(
                                id + 1,
                                x.customername,
                                x.customertier,
                                x.customerphone,
                                x.totaltransaction,
                                x.totalamount,
                                x.remainingpoint
                            )
                        )
                    );
                    setRows(tmp);
                    setData(result.data);
                },
                (error) => {}
            );
    }, []);
    let o = Intl.NumberFormat('en', { notation: 'compact' });
    return (
        <div>
            <Box style={{ display: 'flex', height: '46px' }}>
                <Box style={{ padding: 6, width: '70%', backgroundColor: 'black' }}>
                    <img src="/logo.png" className={styles.AppLogo} alt="logo" />
                </Box>
                <Box style={{ padding: 6, backgroundColor: 'black' }}>
                    <AccountCircleIcon style={{ color: 'white', fontSize: '35px' }} />
                </Box>
                <Box style={{ padding: 6, backgroundColor: 'black', flexShrink: 0 }}>
                    <Typography style={{ color: '#ffa640', fontSize: '12px' }}>MR.ADMIN</Typography>
                    <Typography style={{ color: 'white', fontSize: '12px' }}>Head Quarter</Typography>
                </Box>
                <Box
                    style={{
                        paddingTop: 6,
                        paddingRight: 12,
                        width: '30%',
                        display: 'flex',
                        backgroundColor: '#ffa640',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Typography style={{ color: 'white' }}>Menu</Typography>
                    <FavoriteIcon style={{ color: 'white' }} />
                </Box>
            </Box>

            <Box style={{ display: 'flex', padding: 6 }}>
                <Box style={{ width: '70%', padding: 6, display: 'flex' }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
                            <HomeIcon className={classes.icon} />
                        </Link>
                        <Link
                            color="inherit"
                            href="/getting-started/installation/"
                            onClick={handleClick}
                            className={classes.link}
                        >
                            Business Insight
                        </Link>
                        <Link
                            color="inherit"
                            href="/getting-started/installation/"
                            onClick={handleClick}
                            className={classes.link}
                        >
                            Report
                        </Link>
                        <Link
                            color="inherit"
                            href="/getting-started/installation/"
                            onClick={handleClick}
                            className={classes.link}
                        >
                            Member
                        </Link>
                        <Typography className={classes.hilight}>Member</Typography>
                    </Breadcrumbs>
                </Box>
                <Box style={{ width: '30%', padding: 6, display: 'flex', justifyContent: 'flex-end' }}>
                    <Avatar className={classes.headerCommandColor}>
                        <AssessmentOutlinedIcon />
                    </Avatar>
                    <Avatar className={classes.headerCommandColor2}>
                        <SystemUpdateAltOutlinedIcon />
                    </Avatar>
                    <Avatar className={classes.headerCommandColor2}>
                        <PrintOutlinedIcon />
                    </Avatar>
                </Box>
            </Box>

            <Box style={{ display: 'flex', padding: 6 }}>
                <Box style={{ width: '70%', padding: 6, display: 'flex' }}>
                    <Typography className={classes.hilight2}>Yearly Member 01-Jan-2020 to 31-Dec-2020</Typography>
                </Box>
                <Box style={{ width: '30%', padding: 6, display: 'flex', justifyContent: 'flex-end' }}></Box>
            </Box>

            <Grid container>
                <Grid item container sm={4}>
                    <Grid item sm={10}>
                        <Box
                            style={{
                                backgroundColor: '#ff9800',
                                color: 'white',
                                padding: 12,
                                marginLeft: 12,
                                display: 'flex',
                                fontSize: 24,
                            }}
                        >
                            Total Members:
                        </Box>
                    </Grid>
                    <Grid item sm={2}>
                        <Box
                            style={{
                                backgroundColor: '#ff9800',
                                color: 'white',
                                padding: 12,
                                display: 'flex',
                                fontSize: 24,
                                justifyContent: 'flex-end',
                            }}
                        >
                            {data.total}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item sm={8}>
                    <Grid item sm={12}>
                        <Box
                            style={{
                                backgroundColor: '#0000008a',
                                display: 'flex',
                                color: 'white',
                                fontSize: 24,
                                padding: 12,
                                marginRight: 12,
                                justifyContent: 'center',
                            }}
                        >
                            {data.summarytier ? data.summarytier[0].tier_name : ''}
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container sm={4}>
                    <Grid item sm={10}>
                        <Box
                            style={{
                                backgroundColor: '#ff9800',
                                color: 'white',
                                paddingTop: 22,
                                paddingBottom: 22,
                                paddingLeft: 12,
                                marginLeft: 12,
                                display: 'flex',
                                fontSize: 24,
                            }}
                        >
                            Total Rev.(THB):
                        </Box>
                    </Grid>
                    <Grid item sm={2}>
                        <Box
                            style={{
                                backgroundColor: '#ff9800',
                                color: 'white',
                                paddingTop: 22,
                                paddingBottom: 22,
                                paddingRight: 12,
                                display: 'flex',
                                fontSize: 24,
                                justifyContent: 'flex-end',
                            }}
                        >
                            666K
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container sm={8}>
                    <Grid item sm={6}>
                        <Box
                            style={{
                                backgroundColor: '#0000008a',
                                color: 'white',
                                display: 'flex',
                                padding: 6,
                                fontSize: 19,
                            }}
                        >
                            Total Members:
                        </Box>
                    </Grid>
                    <Grid item sm={6}>
                        <Box
                            style={{
                                backgroundColor: '#0000008a',
                                color: 'white',
                                display: 'flex',
                                padding: 6,
                                fontSize: 19,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingRight: 12,
                                marginRight: 12,
                            }}
                        >
                            {data.summarytier ? data.summarytier[0].total_members : ''}
                        </Box>
                    </Grid>

                    <Grid item sm={6}>
                        <Box
                            style={{
                                backgroundColor: '#0000008a',
                                color: 'white',
                                display: 'flex',
                                padding: 6,
                                fontSize: 19,
                            }}
                        >
                            Total Rev.(THB):
                        </Box>
                    </Grid>
                    <Grid item sm={6}>
                        <Box
                            style={{
                                backgroundColor: '#0000008a',
                                color: 'white',
                                display: 'flex',
                                padding: 6,
                                fontSize: 19,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingRight: 12,
                                marginRight: 12,
                            }}
                        >
                            {data.summarytier ? o.format(data.summarytier[0].total_amount) : ''}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Box style={{ margin: 12 }}>
                <Table rows={rows} />
            </Box>
        </div>
    );
}
