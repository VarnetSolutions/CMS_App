import ApplicationURL from "../models/Application.model.js";

const DeleteApplication = async(req,res)=>{
    const { tenantCode, url } = req.body;

    try {
        if (!tenantCode || !url) {
            return res.status(400).json({ error: 'Tenant code and URL are required' });
        }

        const tenantData = await ApplicationURL.findOne({ tenantCode });

        if (!tenantData) {
            return res.status(404).json({ error: 'No data found for the given tenant code' });
        }

        const updatedUrls = tenantData.urls.filter(item => item.url !== url);

        if (updatedUrls.length === tenantData.urls.length) {
            return res.status(404).json({ error: 'URL not found' });
        }

        tenantData.urls = updatedUrls;
        await tenantData.save();

        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (err) {
        console.error('Error deleting URL:', err);
        res.status(500).json({ error: 'Failed to delete URL' });
    }
}
export default DeleteApplication;