# Beam-Intake-Workflow-Mvp
An MVP demonstrating Beam Health’s intake-first workflow: a unified next-day intake &amp; eligibility worklist with automated, intake-aware patient reminders to reduce clinician admin burden and improve visit readiness.

## Core Beam Workflow

### 1. Unified Next-Day Intake Worklist
- Provides a single view of next-day booked appointments
- Surfaces **intake readiness** and **insurance eligibility** together
- Eliminates manual tool switching and cross-checking
- **Beam Alignment:** Reduces staff cognitive load before clinic days

### 2. Intelligent Reminder Triggering
- “Send Reminder” button is enabled only when outreach is needed
- Prevents accidental or unnecessary reminders
- **Beam Alignment:** Helps staff focus on patients who need extra outreach

### 3. Automated Daily Follow-Up
| Schedule          | Action                                                              | Beam Value                                                                     |
|------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Daily @ 2:00 PM  | Finds next-day booked appointments & sends intake-aware reminders   | Automates follow-up so staff don’t manually chase patients                    |

### 4. AI-Assisted Communication
- Reminder emails are generated using the **OpenAI API**
- Enables future personalization based on intake or eligibility status
- **Beam Alignment:** Lays foundation for AI-driven clinical workflows

## Tech Stack

| Layer         | Technology                                 |
|---------------|--------------------------------------------|
| Frontend      | Next.js, React.js, HTML, CSS               |
| Backend       | Node.js, NestJS                            |
| Database      | In-memory / Mock JSON                      |
| Email         | Nodemailer, Mailtrap                       |
| AI / LLM      | OpenAI API (email templates)               |
| Scheduling    | Cron Job (daily @ 2 PM)                    |
