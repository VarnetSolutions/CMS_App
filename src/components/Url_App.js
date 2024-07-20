import React, { Component } from 'react';
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
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundimage from "./bg.avif";

const FormContainer = styled(Grid)({
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '5px solid #21130d',
});

const TableContainerStyled = styled(TableContainer)({
    maxWidth: '100%',
    marginTop: '20px',
});

const TableCellHeader = styled(TableCell)({
    backgroundColor: '#3f51b5',
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
    color: '#3f51b5',
    textAlign: 'center',
});

class ApplicationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenantCode: '',
            urls: [{ appName: '', url: '' }],
            error: null,
            successMessage: '',
            tableData: [],
            loading: true,
            page: 1,
            limit: 10,
            searchTenantCode: '',
            searchAppName: '',
            expanded: null // State to track which accordion is expanded
        };
    }

    componentDidMount() {
        this.fetchUrls();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.page !== this.state.page ||
            prevState.limit !== this.state.limit ||
            prevState.searchTenantCode !== this.state.searchTenantCode ||
            prevState.searchAppName !== this.state.searchAppName
        ) {
            this.fetchUrls();
        }
    }

    handleChange = (index, event) => {
        const { name, value } = event.target;
        const urls = [...this.state.urls];
        urls[index] = { ...urls[index], [name]: value };
        this.setState({ urls });
    };

    handleAddUrl = () => {
        this.setState((prevState) => ({
            urls: [...prevState.urls, { appName: '', url: '' }],
        }));
        toast.success("Added column successfully");
    };

    handleDeleteUrl = (index) => {
        const urls = [...this.state.urls];
        urls.splice(index, 1);
        this.setState({ urls });
        toast.error("Deleted column successfully");
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { tenantCode, urls } = this.state;

        try {
            const response = await axios.post('http://192.168.1.100:4000/api/AddApplication', { tenantCode, urls });
            this.setState({
                successMessage: response.data.message,
                tenantCode: '',
                urls: [{ appName: '', url: '' }],
                error: null,
            });
            toast.success(response.data.message);
            this.fetchUrls(); // Refresh table data
        } catch (error) {
            this.setState({ error: 'Failed to add application' });
            toast.error('Failed to add application');
        }
    };

    fetchUrls = async () => {
        const { page, limit, searchTenantCode, searchAppName } = this.state;
        this.setState({ loading: true });

        try {
            const response = await axios.get('http://192.168.1.100:4000/api/GetAllapplications', {
                params: { page, limit, tenantCode: searchTenantCode, appName: searchAppName },
            });

            this.setState({
                tableData: response.data,
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
        this.setState({ page: 1 }, this.fetchUrls);
    };

    handlePageChange = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleLimitChange = (event) => {
        this.setState({ limit: parseInt(event.target.value, 10), page: 1 });
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

    // Handle accordion expand
    handleAccordionChange = (tenantCode) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? tenantCode : null });
    };

    render() {
        const { tenantCode, urls, error, successMessage, tableData, loading, limit, page, searchTenantCode, searchAppName, expanded } = this.state;

        return (
            <Grid container sx={{ height: '100vh' }}>
                <Grid item xs={6} sx={{ padding: '20px' }}>
                    <FormContainer container component="form" justifyContent="center" onSubmit={this.handleSubmit} spacing={2}>
                        <Grid item xs={12}>
                            <Header>Add New Application</Header>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tenant Code"
                                name="tenantCode"
                                value={tenantCode}
                                onChange={(event) => this.setState({ tenantCode: event.target.value })}
                                required
                            />
                        </Grid>
                        {urls.map((url, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="Application Name"
                                        name="appName"
                                        value={url.appName}
                                        onChange={(event) => this.handleChange(index, event)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="URL"
                                        name="url"
                                        value={url.url}
                                        onChange={(event) => this.handleChange(index, event)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button variant="contained" color="secondary" onClick={() => this.handleDeleteUrl(index)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleAddUrl}>
                                Add Another URL
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Application
                            </Button>
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <p style={{ color: 'red' }}>{error}</p>
                            </Grid>
                        )}
                        {successMessage && (
                            <Grid item xs={12}>
                                <p style={{ color: 'green' }}>{successMessage}</p>
                            </Grid>
                        )}
                    </FormContainer>
                </Grid>

                <Grid item xs={6} sx={{ padding: '20px' }}>
                    <Header>Application URLs</Header>
                    <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Search Tenant Code"
                                variant="outlined"
                                size="small"
                                value={searchTenantCode}
                                onChange={this.handleInputChange}
                                name="searchTenantCode"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Search Application Name"
                                variant="outlined"
                                size="small"
                                value={searchAppName}
                                onChange={this.handleInputChange}
                                name="searchAppName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleSearch}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                    {loading ? (
                        <Typography variant="h6" align="center">Loading...</Typography>
                    ) : (
                        <TableContainerStyled component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCellHeader>Tenant Code</TableCellHeader>
                                        <TableCellHeader>Application Name</TableCellHeader>
                                        <TableCellHeader>URL</TableCellHeader>
                                        <TableCellHeader>Actions</TableCellHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.length ? (
                                        tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCellBody>{row.tenantCode}</TableCellBody>
                                                <TableCellBody>
                                                    <Accordion
                                                        expanded={expanded === row.tenantCode}
                                                        onChange={this.handleAccordionChange(row.tenantCode)}
                                                    >
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>{row.appName}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>URL: {row.url}</Typography>
                                                            <IconButton color="secondary" onClick={() => this.handleDelete(row.tenantCode, row.url)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </TableCellBody>
                                                <TableCellBody>{row.url}</TableCellBody>
                                                <TableCellBody>
                                                    <IconButton color="secondary" onClick={() => this.handleDelete(row.tenantCode, row.url)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCellBody>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainerStyled>
                    )}
                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handlePrevPage}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNextPage}
                                disabled={tableData.length < limit}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <ToastContainer />
            </Grid>
        );
    }
}

export default ApplicationManager;
