import { IntakeStatus } from "../types/intakeListDetails.types";

 
 
 export async function buildAppointmentRow(appt, patient, insurances) {
  const intake_status = await getIntakeStatus(appt, patient, insurances);
  const eligibility_status = await getEligibilityStatus(appt,patient,insurances);

  return {
    ...appt,
    intake_status,
    eligibility_status,
  };
}

 export async function getIntakeStatus(appt, patient, insurances): Promise<IntakeStatus> {
  if (!appt.patient_id) {
    return 'Missing forms'; // no patient attached yet
  }

  //const patient = patients.find(p => p.id === appt.patient_id);
  if (!patient) {
    return 'Missing forms';
  }

  const missingDemographics =
    !patient.email ||
    !patient.phone ||
    !patient.dob ||
    !patient.gender;

  if (missingDemographics) {
    return 'Missing forms';
  }

  const insurance = insurances.find(i => i.id === patient.insurance_id);

  if (insurance && insurance.eligible === false) {
    return 'Insurance issue';
  }

  return 'Ready';
}


  export async function getEligibilityStatus(appt, patient,insurances): Promise<string> {
  if (!appt.patient_id) return 'Unknown';

  const insurance = insurances.find(i => i.id === patient.insurance_id);
  if (!insurance) return 'Unknown';

  if (insurance.eligible === true) {
    return insurance.coPay != null
      ? `Eligible (coPay: $${insurance.coPay})`
      : 'Eligible';
  }

  if (insurance.eligible === false) {
    if (insurance.reason) {
      return `Ineligible: ${insurance.reason}`;
    }
    return 'Ineligible';
  }

  return 'Unknown';
}
