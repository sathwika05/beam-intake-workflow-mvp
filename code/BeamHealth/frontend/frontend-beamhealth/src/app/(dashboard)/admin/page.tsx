"use client";

import UserCard from "@/components/UserCard";
import {useEffect, useState} from "react";


const BASE_URL = "http://localhost:3001";

type Counts = {
  patients: number;
  appointments: number;
  insurances: number;
};

const AdminPage = () => {
  console.log("ADMIN PAGE RENDERED");
  const [counts, setCounts] = useState<Counts>({
    patients: 0,
    appointments: 0,
    insurances: 0,
  });
  
    useEffect(() => {
    const fetchCounts = async () => {
      const [patients, appointments, insurances] = await Promise.all([
        fetch(`${BASE_URL}/beam/patients/count`).then((r) => r.json()),
        fetch(`${BASE_URL}/beam/appointments/count`).then((r) => r.json()),
        fetch(`${BASE_URL}/beam/insurances/count`).then((r) => r.json()),
      ]);
     
      setCounts({
        patients: patients.count,
        appointments: appointments.count,
        insurances: insurances.count,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">
      {/* USER CARDS */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCard type={"Patients"} count={counts.patients}/>
        <UserCard type={"Appointments"} count={counts.appointments}/>
        <UserCard type={"Insurances"} count={counts.insurances}/>
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3"></div>
    </div>
  );
};


export default AdminPage;