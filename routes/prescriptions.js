import express from 'express';
import { patients, prescriptions} from '../config/mongoCollections.js';
import {validateStringInput,
    validateEmail,
    validateNumberInput,
    validateObjectInput} from '../helpers.js'

const router = express.Router();
router.get("/:id", async (req, res) => {
    try {
        const prescription = await prescriptions.getPrescriptionsByPatientId(req.params.id);
        res.json(prescription);
    } catch (e) {
        res.status(404).json({ message: "Prescription not found" });
    }
});

router.post("/", async (req, res) => {
    const prescriptionInfo = req.body;

    if (!prescriptionInfo) throw "You must provide data to create a prescription";

    try {
        validateNumberInput("rx_number", prescriptionInfo.rx_number);
        validateEmail(prescriptionInfo.issue_date);
        validateStringInput("drug_name", prescriptionInfo.drug_name);
        validateStringInput("drug_NDC", prescriptionInfo.drug_NDC);
        validateNumberInput("quantity", prescriptionInfo.quantity);
        validateStringInput("sig/instructions", prescriptionInfo["sig/instructions"]);
        validateNumberInput("refills", prescriptionInfo.refills);
        validateNumberInput("daw", prescriptionInfo.daw);
        validateStringInput("prescribing_dr_name", prescriptionInfo.prescribing_dr_name);
        validateNumberInput("prescriber_npi", prescriptionInfo.prescriber_npi);
        validateObjectInput("prescriber_address", prescriptionInfo.prescriber_address);
        validateStringInput("prescriber_speciality", prescriptionInfo.prescriber_speciality);

        const newPrescription = await prescriptions.createPrescription(
            prescriptionInfo.rx_number,
            prescriptionInfo.issue_date,
            prescriptionInfo.drug_name,
            prescriptionInfo.drug_NDC,
            prescriptionInfo.quantity,
            prescriptionInfo["sig/instructions"],
            prescriptionInfo.refills,
            prescriptionInfo.daw,
            prescriptionInfo.prescribing_dr_name,
            prescriptionInfo.prescriber_npi,
            prescriptionInfo.prescriber_address,
            prescriptionInfo.prescriber_speciality
        );

        res.status(200).json(newPrescription);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.put("/:id", async (req, res) => {
    const updatedData = req.body;

    if (!updatedData) throw "You must provide data to update a prescription";

    try {
        await prescriptions.getPrescriptionsByPatientId(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "Prescription not found" });
        return;
    }

    try {
        const updatedPrescription = await prescriptions.updatePrescription(req.params.id, updatedData);
        res.json(updatedPrescription);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await prescriptions.getPrescriptionsByPatientId(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "Prescription not found" });
        return;
    }

    try {
        await prescriptions.deletePrescription(req.params.id);
        res.json({ message: "Prescription deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;
