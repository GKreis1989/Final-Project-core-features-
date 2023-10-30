import { patients } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {validateStringInput,
    validateDateInput,
    validateEmail,
    validateNumberInput,
    validateObjectInput,
    validateBoolean} from '../helpers.js'
async function createPatient(patient_type, patient_last_name, patient_first_name, patient_dob, patient_gender, patient_weight, patient_address, patient_phone_number, patient_email, allergies, medical_conditions, profile_active) {
    validateStringInput("patient_type", patient_type);
    validateStringInput("patient_last_name", patient_last_name);
    validateStringInput("patient_first_name", patient_first_name);
    validateStringInput("patient_dob", patient_dob);
    validateStringInput("patient_gender", patient_gender);
    validateStringInput("patient_weight", patient_weight);
    validateObjectInput("patient_address", patient_address);
    validateNumberInput("patient_phone_number", patient_phone_number);
    validateEmail("patient_Email", patient_email);
    validateStringInput("allergies", allergies);
    validateStringInput("medical_conditions", medical_conditions);

    const patientCollection = await patients();

    let newPatient = {
        patient_type,
        patient_last_name,
        patient_first_name,
        patient_dob,
        patient_gender,
        patient_weight,
        patient_address,
        patient_phone_number,
        patient_email,
        allergies,
        medical_conditions,
        profile_active,
        prescriptions: []
    };

    const insertInfo = await patientCollection.insertOne(newPatient);
    if (insertInfo.insertedCount === 0) throw "Could not add patient";

    const newId = insertInfo.insertedId;
    const patientId = await getPatientById(newId.toString());
    return patientId;
}

async function getPatientById(id) {
    if (!id) throw "You must provide an id to search for";
    const patientCollection = await patients();
    const patientId = await patientCollection.findOne({ _id: new ObjectId(id) });
    if (patientId === null) throw "No patient with that id";
    return patientId;
}

async function updatePatient(id, updatedPatient) {
    const patientCollection = await patients();
    let updatedPatientData = {};

    if (updatedPatient.patient_type) {
        updatedPatientData.patient_type = updatedPatient.patient_type;
    }
    if (updatedPatient.patient_last_name) {
        updatedPatientData.patient_last_name = updatedPatient.patient_last_name;
    }
    if (updatedPatient.patient_first_name) {
        updatedPatientData.patient_first_name = updatedPatient.patient_first_name;
    }
    if (updatedPatient.patient_dob) {
        updatedPatientData.patient_dob = updatedPatient.patient_dob;
    }
    if (updatedPatient.patient_gender) {
        updatedPatientData.patient_gender = updatedPatient.patient_gender;
    }
    if (updatedPatient.patient_weight) {
        updatedPatientData.patient_weight = updatedPatient.patient_weight;
    }
    if (updatedPatient.patient_address) {
        updatedPatientData.patient_address = updatedPatient.patient_address;
    }
    if (updatedPatient.patient_phone_number) {
        updatedPatientData.patient_phone_number = updatedPatient.patient_phone_number;
    }
    if (updatedPatient.patient_email) {
        updatedPatientData.patient_email = updatedPatient.patient_email;
    }
    if (updatedPatient.allergies) {
        updatedPatientData.allergies = updatedPatient.allergies;
    }
    if (updatedPatient.medical_conditions) {
        updatedPatientData.medical_conditions = updatedPatient.medical_conditions;
    }
    if (updatedPatient.profile_active) {
        updatedPatientData.profile_active = updatedPatient.profile_active;
    }

    const updatedInfo = await patientCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedPatientData });
    if (updatedInfo.modifiedCount === 0) throw "Could not update patient successfully";

    return await getPatientById(id);
}

export default {
    createPatient,
    getPatientById,
    updatePatient
};
