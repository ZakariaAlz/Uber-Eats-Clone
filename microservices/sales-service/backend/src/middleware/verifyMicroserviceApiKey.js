const verifyMicroserviceApiKey = (req, res, next) => {
    const microserviceApiKey = req.headers['apikey'];
    const senderPort = req.connection.remotePort; // Get the source sender port

    console.log('Microservice API Key:', microserviceApiKey);
    console.log('Source Sender Port:', senderPort); // Log the source sender port

    if (microserviceApiKey === 'P6APPN48d9tn5pnYkCkvJshkbzH1Kfn') {
        next();
    } else {
        res.status(403).json({ error: 'Invalid microservice API key' });
    }
};

module.exports = verifyMicroserviceApiKey;
