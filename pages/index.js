'use client';
import { Fragment, React, useState } from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Map from '../components/Map';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useProviders } from '@/hooks/api';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const { data: providers, isLoading, error } = useProviders();

  const [activeLocation, setActiveLocation] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-row justify-between p-10 bg-slate-50">
        <div className="w-1/2 mr-10">
          {providers.map((provider, index) => (
            <Card
              className="shadow-md"
              key={index}
              provider={provider}
              isActive={activeLocation === provider.id}
            />
          ))}
        </div>
        <div className="w-1/2 rounded h-1/2">
          <Map providers={providers} onMarkerClick={setActiveLocation} />
        </div>
      </main>
    </>
  );
}

//   {
//     id: 1,
//     specialization: 'Oncology',
//     name_prefix: null,
//     name_suffix: null,
//     credential: 'MD',
//     last_name: 'Dorian',
//     first_name: 'John',
//     middle_name: null,
//     gender: 'male',
//     license_number: 'ZD9112',
//     npi: '1345343205604',
//     created_at: '2023-05-15T04:33:06.033Z',
//     cases: [
//       {
//         case_id: 1,
//         cancer_type: {
//           id: 10,
//           name: 'Kidney Cancer',
//         },
//         subtype: {
//           id: 50,
//           name: 'Metastatic Oncocytoma',
//         },
//         caseDetails: [
//           {
//             id: 1,
//             first_name: 'Katie',
//             last_name: 'Coleman',
//             email: 'katiekickscancer@gmail.com',
//             cancer_type: 10,
//             cancer_subtype: 50,
//             stage_at_dx: 4,
//             current_stage: 4,
//             grade: 2,
//             bio: 'This is my bio',
//             hospital: 'MD Anderson Cancer Center',
//             access_level: 1,
//             dob: '1991-05-13',
//           },
//         ],
//         stage: {
//           patient_id: 1,
//           currentState: 4,
//         },
//       },
//     ],
//     institutions: [
//       {
//         id: 1,
//         name: 'Sacred Heart Hospital',
//         address: '123 Heal Drive',
//         city: 'Houston',
//         state: 'TX',
//         zip: '78610',
//         country: 'United States',
//         created_at: '2023-05-14T23:56:49.02491',
//       },
//     ],
//   },
// ];
