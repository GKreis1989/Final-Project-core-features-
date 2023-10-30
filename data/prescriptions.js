import { patients } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {validateStringInput,
    validateDateInput,
    validateNumberInput,
    validateObjectInput} from '../helpers.js'

async function createPrescription(patientId, rx_number, issue_date, drug_name, drug_NDC, quantity, sig_instructions, refills, daw, prescribing_dr_name, prescriber_npi, prescriber_address, prescriber_speciality) {
    validateStringInput("patientId", patientId);
    validateNumberInput("rx_number", rx_number);
    validateDateInput(issue_date);
    validateStringInput("drug_name", drug_name);
    validateStringInput("drug_NDC", drug_NDC);
    validateNumberInput("quantity", quantity);
    validateStringInput("sig_instructions", sig_instructions);
    validateNumberInput("refills", refills);
    validateNumberInput("daw", daw);
    validateStringInput("prescribing_dr_name", prescribing_dr_name);
    validateNumberInput("prescriber_npi", prescriber_npi);
    validateObjectInput("prescriber_address", prescriber_address);
    validateStringInput("prescriber_speciality", prescriber_speciality);

    const patientCollection = await patients();
    const patient = await patientCollection.findOne({ _id: new ObjectId(patientId) });
    if (!patient) throw "Patient not found";

    let newPrescription = {
        rx_number,
        issue_date,
        drug_name,
        drug_NDC,
        quantity,
        sig_instructions,
        refills,
        daw,
        prescribing_dr_name,
        prescriber_npi,
        prescriber_address,
        prescriber_speciality
    };

    const updateInfo = await patientCollection.updateOne({ _id: new ObjectId(patientId) }, { $push: { prescriptions: newPrescription }, $inc: { num_prescriptions: 1 } });
    if (updateInfo.modifiedCount === 0) throw "Could not add prescription to patient";

    return newPrescription;
}

async function getPrescriptionsByPatientId(patientId) {
    validateStringInput("patientId", patientId);

    const patientCollection = await patients();
    const patient = await patientCollection.findOne({ _id: new ObjectId(patientId) });
    if (!patient) throw "Patient not found";

    return patient.prescriptions;
}

async function deletePrescription(patientId, prescriptionId) {
    validateStringInput("patientId", patientId);
    validateStringInput("prescriptionId", prescriptionId);

    const patientCollection = await patients();
    const patient = await patientCollection.findOne({ _id: new ObjectId(patientId) });
    if (!patient) throw "Patient not found";

    const updateInfo = await patientCollection.updateOne({ _id: new ObjectId(patientId) }, { $pull: { prescriptions: { _id: new ObjectId(prescriptionId) } }, $inc: { num_prescriptions: -1 } });
    if (updateInfo.modifiedCount === 0) throw "Could not delete prescription from patient";

    return true;
}

async function updatePrescription(patientId, prescriptionId) {

    return true;
}



export default {
    createPrescription,
    getPrescriptionsByPatientId,
    deletePrescription,
    updatePrescription
};
