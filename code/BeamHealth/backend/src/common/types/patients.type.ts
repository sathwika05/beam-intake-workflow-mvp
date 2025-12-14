export interface Patient {
    "id": number;
    "first_name": string;
    "last_name": string;
    "dob": string;
    "email": string;
    "phone": string;
    "gender": string;
    "insurance_id"?:number;
}