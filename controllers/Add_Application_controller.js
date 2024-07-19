import ApplicationURL from "../models/Application.model.js";

const Appliction =async (req,res)=>{
    const { tenantCode, urls } = req.body;

    console.log('Received Data:', JSON.stringify(req.body, null, 2));

    try {
        // Validate incoming data structure
        if (!tenantCode) {
            console.error('Validation Error: Missing tenantCode');
            return res.status(400).json({ error: 'Invalid tenantCode' });
        }

        if (!Array.isArray(urls)) {
            console.error('Validation Error: urls is not an array');
            return res.status(400).json({ error: 'Invalid URLs data format' });
        }

        const invalidUrl = urls.some(url => {
            console.log('URL Item:', JSON.stringify(url, null, 2));
            return typeof url !== 'object' || !url.url || !url.appName;
        });

        if (invalidUrl) {
            console.error('Validation Error: One or more URLs are invalid');
            return res.status(400).json({ error: 'Invalid URLs data format' });
        }

        // Check if URLs for the tenant already exist
        let existingURLs = await ApplicationURL.findOne({ tenantCode });

        if (existingURLs) {
            // Update existing URLs if found
            existingURLs.urls = urls;
            await existingURLs.save();
        } else {
            // Create new URLs entry if not found
            await ApplicationURL.create({ tenantCode, urls });
        }

        res.status(200).json({ message: 'URLs saved successfully' });
    } catch (err) {
        console.error('Error saving URLs:', err);
        res.status(500).json({ error: 'Failed to save URLs' });
    }
}
export default Appliction;