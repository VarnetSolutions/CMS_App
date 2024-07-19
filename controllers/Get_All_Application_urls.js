import ApplicationURL from "../models/Application.model.js";

const Get_All_Application_url = async (req, res) => {
    try {
        // console.log(req.body)
        const { page = 1, limit = 10, tenantCode, appName } = req.query;
        const query = {};

        // Filter by tenantCode if provided
        if (tenantCode) {
            query.tenantCode = { $regex: tenantCode, $options: 'i' };  // 'i' for case-insensitive
        }

        // // Filter by appName if provided
        if (appName) {
            query['urls.appName'] = { $regex: `^${appName}`, $options: 'i' };  // 'i' for case-insensitive
        }

        // Pagination logic
        const options = {
            limit: parseInt(limit, 10),   // convert string to number
            skip: (page - 1) * limit,
        };

        // Log the query and options
        // console.log('Query:', query);
        // console.log('Options:', options);

        // Execute query with pagination and filters
        const urls = await ApplicationURL.find(query, null, options);

        if (!urls || urls.length === 0) {
            return res.status(404).json({ error: 'No URLs found' });
        }

        res.status(200).json(urls);

    } catch (err) {
        console.error('Error fetching URLs:', err);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
};

export default Get_All_Application_url;


