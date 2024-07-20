// import React, { Component } from 'react';
// import axios from 'axios';
// import { Grid, Paper, TextField, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import backgroundimage from "./pixel.jpg"

// const FormContainer = styled(Grid)({
//   maxWidth: '600px',
//   margin: '20px auto',
//   padding: '20px',
//   border: '5px solid #21130d',
//   // backgroundColor:"white"
// });

// const StyledTextField = styled(TextField)({
//   marginBottom: '10px',
// });

// const StyledButton = styled(Button)({
//   marginTop: '10px',
// });

// const Header = styled('div')({
//   fontSize: '24px',
//   fontWeight: 'bold',
//   marginBottom: '20px',
//   color: '#3f51b5', // Header text color
//   textAlign: 'center', // Center align text
// });

// class AddApplication extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tenantCode: '',
//       urls: [{ appName: '', url: '' }], // Initial state with one URL input
//       error: null,
//       successMessage: '',
//     };
//   }

//   handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const urls = [...this.state.urls];
//     urls[index] = { ...urls[index], [name]: value };
//     this.setState({ urls });
//   };

//   handleAddUrl = () => {
//     this.setState((prevState) => ({
//       urls: [...prevState.urls, { appName: '', url: '' }],
//     }));
//     toast.success("Add coloums Successfully")
//   };

//   handleDeleteUrl = (index) => {
//     const urls = [...this.state.urls];
//     urls.splice(index, 1);
//     this.setState({ urls });
//     toast.error("Delete coloums Successfully")
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { tenantCode, urls } = this.state;

//     try {
//       const response = await axios.post('http://192.168.1.100:4000/api/AddApplication', { tenantCode, urls });
//       this.setState({
//         successMessage: response.data.message,
//         tenantCode: '',
//         urls: [{ appName: '', url: '' }], // Reset form after successful submission
//         error: null,
//       });
//       toast.success(response.data.message);
//     } catch (error) {
//       this.setState({ error: 'Failed to add application' });
//       toast.error('Failed to add application');
//     }
//   };

//   render() {
//     const { tenantCode, urls, error, successMessage } = this.state;

//     return (
//       <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor:"#E4EFE2"
//       }}>
//         <Grid item xs={10}>
//           <ToastContainer />
//           <FormContainer container component="form" justifyContent="center" onSubmit={this.handleSubmit} spacing={2}>
//             <Grid item xs={12}>
//               <Header>Add New Application</Header>
//             </Grid>
//             <Grid item xs={12}>
//               <StyledTextField
//                 fullWidth
//                 label="Tenant Code"
//                 name="tenantCode"
//                 value={tenantCode}
//                 onChange={(event) => this.setState({ tenantCode: event.target.value })}
//                 required
//               />
//             </Grid>
//             {urls.map((url, index) => (
//               <React.Fragment key={index}>
//                 <Grid item xs={5}>
//                   <StyledTextField
//                     fullWidth
//                     label="Application Name"
//                     name="appName"
//                     value={url.appName}
//                     onChange={(event) => this.handleChange(index, event)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={5}>
//                   <StyledTextField
//                     fullWidth
//                     label="URL"
//                     name="url"
//                     value={url.url}
//                     onChange={(event) => this.handleChange(index, event)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
//                   <Button variant="contained" color="secondary" onClick={() => this.handleDeleteUrl(index)}>
//                     Delete
//                   </Button>
//                 </Grid>
//               </React.Fragment>
//             ))}
//             <Grid item xs={12}>
//               <StyledButton variant="contained" color="primary" onClick={this.handleAddUrl}>
//                 Add Another URL
//               </StyledButton>
//             </Grid>
//             <Grid item xs={12}>
//               <StyledButton type="submit" variant="contained" color="primary">
//                 Add Application
//               </StyledButton>
//             </Grid>
//             {error && (
//               <Grid item xs={12}>
//                 <p style={{ color: 'red' }}>{error}</p>
//               </Grid>
//             )}
//             {successMessage && (
//               <Grid item xs={12}>
//                 <p style={{ color: 'green' }}>{successMessage}</p>
//               </Grid>
//             )}
//           </FormContainer>
//         </Grid>
//       </Grid>
//     );
//   }
// }

// export default AddApplication;
