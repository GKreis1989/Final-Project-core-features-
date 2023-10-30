import express from 'express';
import { patients, prescriptions} from '../config/mongoCollections.js';
import {validateStringInput,
    validateDateInput,
    validateEmail,
    validateNumberInput,
    validateObjectInput,
    validateBoolean} from '../helpers.js'

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const patient = await patients.getPatientById(req.params.id);
        res.json(patient);
    } catch (e) {
        res.status(404).json({ message: "Patient not found" });
    }
});

router.post("/", async (req, res) => {
    const patientInfo = req.body;

    if (!patientInfo) throw "You must provide data to create a patient";

    try {
        validateStringInput("patient_type", patientInfo.patient_type);
        validateStringInput("patient_last_name", patientInfo.patient_last_name);
        validateStringInput("patient_first_name", patientInfo.patient_first_name);
        validateDateInput(patientInfo.patient_dob);
        validateStringInput("patient_gender", patientInfo.patient_gender);
        validateStringInput("patient_weight", patientInfo.patient_weight);
        validateObjectInput("patient_address", patientInfo.patient_address);
        validateStringInput("patient_phone_number", patientInfo.patient_phone_number);
        validateEmail(patientInfo.patient_email);
        validateStringInput("allergies", patientInfo.allergies);
        validateStringInput("medical_conditions", patientInfo.medical_conditions);
        validateBoolean("profile_active", patientInfo.profile_active);
        validateNumberInput("num_prescriptions", patientInfo.num_prescriptions);

        const newPatient = await patients.createPatient(
            patientInfo.patient_type,
            patientInfo.patient_last_name,
            patientInfo.patient_first_name,
            patientInfo.patient_dob,
            patientInfo.patient_gender,
            patientInfo.patient_weight,
            patientInfo.patient_address,
            patientInfo.patient_phone_number,
            patientInfo.patient_email,
            patientInfo.allergies,
            patientInfo.medical_conditions,
            patientInfo.profile_active,
            patientInfo.num_prescriptions
        );

        res.status(200).json(newPatient);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.put("/:id", async (req, res) => {
    const updatedData = req.body;

    if (!updatedData) throw "You must provide data to update a patient";

    try {
        await patients.getPatientById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "Patient not found" });
        return;
    }

    try {
        const updatedPatient = await patients.updatePatient(req.params.id, updatedData);
        res.json(updatedPatient);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

module.exports = router;
