import ApplicationURL from "../models/Application.model.js";

const GetApplication =async(req,res)=>{
    const { tenantCode } = req.query;

    try {
        if (!tenantCode) {
            return res.status(400).json({ error: 'Tenant code is required' });
        }

        const urls = await ApplicationURL.findOne({ tenantCode });

        if (!urls) {
            return res.status(404).json({ error: 'No URLs found for the given tenant code' });
        }

        res.render('Application_url', { urls }); // Assuming 'urls.ejs' is your template

    } catch (err) {
        console.error('Error fetching URLs:', err);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
}

export default GetApplication;