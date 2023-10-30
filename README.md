# Asclepius: Medical Management System

      Asclepius is a state-of-the-art medical management system designed to revolutionize the way healthcare professionals manage patient records and prescriptions. It aims to streamline the prescription process by integrating with openFDA data, thereby making it easier for doctors to prescribe medications.

      ## Features

      ### Basic Features:

      #### User Management:
      - User registration and login.
      - Role-based access (Doctor, Nurse, Admin, Pharmacist, etc.).
      - Password reset and account recovery.

      #### Patient Management:
      - Add, view, update, and delete patient profiles.
      - Record patient medical history, allergies, and other relevant details.

      #### Prescription Management:
      - Prescribe medications for patients.
      - View and manage active and past prescriptions.
      - Verify drug quantity based on type (tablet, capsule, gram for ointments/creams or powders, ml for liquids).
      - Define the route of administration (oral, topical, intravenous, etc.).
      - Define frequency (once daily, twice daily, etc.).
      - Generate prescription instructions using structured verbs and guidelines.

      #### Drug Management:
      - Add, view, update, and delete drug details.
      - Specify the type of drug (tablet, liquid, cream, etc.).
      - Store potential side effects and contraindications.
      - Mark drugs as controlled substances.

      #### Controlled Substance Prescription:
      - Require prescriber to input a password or second authentication factor when prescribing controlled substances.
      - Log controlled substance prescriptions for auditing and tracking.

      #### Search Functionality:
      - Search for patients, drugs, and prescriptions based on various criteria.

      ### Extra Features:

      #### Drug-Drug Interaction Checks:
      - When prescribing a medication, check if there are any potential interactions with the patient's current medications.

      #### Patient Portal:
      - Allow patients to view their prescriptions and communicate with the office.

      #### Notifications:
      - Notify patients when a new prescription is sent.
      - Notify prescribers of any alerts related to the medications they prescribe.

      #### Audit Logs:
      - Keep track of all actions performed in the system, especially for controlled substances and sensitive patient data.

      #### Digital Prescription:
      - Integration with pharmacies to send prescriptions digitally.
      - Track the status of prescriptions (sent, failed).

      #### Appointment Scheduling:
      - Allow staff to schedule, view, and manage patient appointments.
      - Send reminders to patients about upcoming appointments.

      #### Educational Material:
      - Store and provide educational material related to diseases, medications, and treatments for both staff and patients.

      #### Backup and Data Recovery:
      - Regularly backup data and provide mechanisms for data recovery in case of system failures.

      ## Getting Started

      Detailed installation and usage instructions will be added as the project progresses. For now, follow standard npm installation procedures and check back for updates.

      ## Contributors

      [List of contributors]

      ## License

      This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.

      ## Acknowledgments

      - Special thanks to openFDA for providing the data that powers this application.


## Setup
1. Install dependencies: `npm install`
2. Run the server: `npm start`

