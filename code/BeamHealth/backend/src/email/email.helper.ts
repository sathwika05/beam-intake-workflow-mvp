import { IntakeListDetails } from "src/common/types/intakeListDetails.types";

export type EmailKind =
  | "READY_REMINDER"
  | "INTAKE_MISSING"
  | "INSURANCE_ISSUE";

export function getEmailKind(appt: IntakeListDetails): EmailKind {
  const intake = appt.intake_status.toLowerCase();
  const elig = appt.eligibility_status.toLowerCase();

  if (intake.includes("ready") && elig.includes("eligible")) {
    return "READY_REMINDER";
  }
  if (intake.includes("missing")) {
    return "INTAKE_MISSING";
  }
  if (elig.includes("ineligible") || elig.includes("out-of-network")) {
    return "INSURANCE_ISSUE";
  }
  return "READY_REMINDER";
}

export function buildFallbackEmail(
  kind: EmailKind,
  appt: IntakeListDetails,
  date: string,
  time: string,
): string {
  switch (kind) {
    case "INTAKE_MISSING":
      return `Dear ${appt.first_name},

This is a reminder of your appointment on ${date} at ${time} with Beam Health.

Our records show that required intake forms are still missing. Please complete them before your visit or contact the clinic if you need assistance.

Best regards,
Beam Health`;

    case "INSURANCE_ISSUE":
      return `Dear ${appt.first_name},

This is a reminder of your appointment on ${date} at ${time} with Beam Health.

We noticed a potential insurance eligibility issue (${appt.eligibility_status}). Please contact the clinic before your visit so we can help resolve this.

Best regards,
Beam Health`;

    default:
      return `Dear ${appt.first_name},

This is a reminder of your upcoming appointment on ${date} at ${time} with Beam Health.

If you need to reschedule, please contact the clinic.

Best regards,
Beam Health`;
  }
}
