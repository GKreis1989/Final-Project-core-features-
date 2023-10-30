import patientsRoutes from './patients.js';
import prescriptionsRoutes from './prescriptions.js';

const constructorMethod = (app) => {
    app.use('/patients', patientsRoutes);
    app.use('/prescriptions', prescriptionsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Route Not found'});
    });
};

export default constructorMethod;