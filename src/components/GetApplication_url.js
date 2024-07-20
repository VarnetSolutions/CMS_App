import React, { Component } from 'react';
import axios from 'axios';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundimage from "./bg.avif"

const TableContainerStyled = styled(TableContainer)({
    maxWidth: '100%',
    marginTop: '20px',
});

const TableCellHeader = styled(TableCell)({
    backgroundColor: '#3f51b5', // Header background color
    color: 'white',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: '16px',
});

const TableCellBody = styled(TableCell)({
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: '16px',
});

const Header = styled('div')({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#3f51b5', // Header text color
});

class ApplicationUrlsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            loading: true,
            error: null,
            page: 1,
            limit: 10,
            tenantCode: '',
            appName: '',
        };
    }

    componentDidMount() {
        this.fetchUrls();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.page !== this.state.page ||
            prevState.limit !== this.state.limit ||
            prevState.tenantCode !== this.state.tenantCode ||
            prevState.appName !== this.state.appName
        ) {
            this.fetchUrls();
        }
    }

    fetchUrls = async () => {
        const { page, limit, tenantCode, appName } = this.state;
        this.setState({ loading: true });

        try {
            const response = await axios.get('http://192.168.1.100:4000/api/GetAllapplications', {
                params: { page, limit, tenantCode, appName },
            });

            console.log('Response:', response.data);
            this.setState({
                urls: response.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({
                error: 'Failed to fetch data',
                loading: false,
            });
        }
    };

    handleSearch = () => {
        this.setState({ page: 1 }, this.fetchUrls); // Reset page to 1 when search criteria change
    };

    handlePageChange = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleLimitChange = (event) => {
        this.setState({ limit: parseInt(event.target.value, 10), page: 1 }); // Reset page to 1 when limit changes
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handlePrevPage = () => {
        this.setState((prevState) => ({ page: prevState.page - 1 }), this.fetchUrls);
    };

    handleNextPage = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchUrls);
    };

    handleDelete = async (tenantCode, url) => {
        try {
            await axios.delete('http://192.168.1.100:4000/api/DeleteApplication', { data: { tenantCode, url } });
            toast.success('URL deleted successfully');
            this.fetchUrls();
        } catch (error) {
            console.error('Error deleting URL:', error);
            toast.error('Failed to delete URL');
        }
    };

    render() {
        const { urls, loading, error, limit, page, tenantCode, appName } = this.state;

        return (
            <Grid container justifyContent="center" sx={{ height: '100vh' }}>
                <Grid item xs={10}>
                    <ToastContainer />
                    <Header sx={{ marginTop: "10px", textAlign: "center" }}>Application URLs</Header>
                    <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tenant Code"
                                variant="outlined"
                                name="tenantCode"
                                value={tenantCode}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Application Name"
                                variant="outlined"
                                name="appName"
                                value={appName}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Results Per Page"
                                variant="outlined"
                                value={limit}
                                onChange={this.handleLimitChange}
                                SelectProps={{ native: true }}
                            >
                                {[5, 10, 20, 50, 100].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" onClick={this.handleSearch}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tenant Code</TableCell>
                                    <TableCell>Application Name</TableCell>
                                    <TableCell>URL</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : urls.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                            No URLs found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    urls.map((urlObj) => (
                                        <React.Fragment key={urlObj.tenantCode}>
                                            <TableRow>
                                                <TableCell>
                                                    <Accordion
                                                        expanded={expandedTenant === urlObj.tenantCode}
                                                        onChange={() => this.handleExpand(urlObj.tenantCode)}
                                                    >
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>{urlObj.tenantCode}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Table>
                                                                <TableBody>
                                                                    {urlObj.urls.map((url, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCell>{url.appName}</TableCell>
                                                                            <TableCell>{url.url}</TableCell>
                                                                            <TableCell>
                                                                                <IconButton
                                                                                    color="secondary"
                                                                                    onClick={() => this.handleDelete(urlObj.tenantCode, url.url)}
                                                                                >
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handlePrevPage}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleNextPage}
                            disabled={urls.length < limit}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ApplicationUrlsTable;
