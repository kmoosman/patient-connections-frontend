import { Fragment, React, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TypeCard from './TypeCard';
import CasesModal from './CasesModal';

export default function Card({ provider, isActive }) {
  const { name, institution } = provider;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCancerType, setSelectedCancerType] = useState(null);
  const [selectedProvider, setSelectedPr] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (cancerType) => {
    setSelectedCancerType(cancerType);
    setIsModalOpen(true);
  };

  const cardStyle = isActive
    ? 'border-4 border-indigo-300 shadow-lg'
    : 'shadow-md border-2 border-gray-200 ';

  const uniqueCancerTypes = [
    ...new Set(provider.cases.map((caseItem) => caseItem.cancer_type.id)),
  ]
    .map(
      (cancerTypeId) =>
        provider.cases.find(
          (caseItem) => caseItem.cancer_type.id === cancerTypeId
        ).cancer_type
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className={`p-4 m-2  max-w-sm w-full lg:max-w-full lg:flex border bg-white shadow-lg rounded ${cardStyle}`}
    >
      {isModalOpen && (
        <CasesModal
          show={true}
          fragment={Fragment}
          provider={provider}
          selectedCancerType={selectedCancerType}
          closeModal={closeModal}
        />
        // <Transition.Root show={isModalOpen} as={Fragment}>
        //   <Dialog as="div" className="relative z-10" onClose={closeModal}>
        //     <Transition.Child
        //       as={Fragment}
        //       enter="ease-out duration-300"
        //       enterFrom="opacity-0"
        //       enterTo="opacity-100"
        //       leave="ease-in duration-200"
        //       leaveFrom="opacity-100"
        //       leaveTo="opacity-0"
        //     >
        //       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        //     </Transition.Child>

        //     <div className="fixed inset-0 z-10 overflow-y-auto">
        //       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        //         <Transition.Child
        //           as={Fragment}
        //           enter="ease-out duration-300"
        //           enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //           enterTo="opacity-100 translate-y-0 sm:scale-100"
        //           leave="ease-in duration-200"
        //           leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        //           leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //         >
        //           <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-2/3 sm:p-6">
        //             <div className="h-96">
        //               <div className="bg-indigo-100 p-4 flex flex-row justify-between rounded ">
        //                 <h1 className="text-2xl font-semibold self-center text-gray-900">
        //                   {selectedCancerType} Cancer
        //                 </h1>
        //                 <div>
        //                   <h3 className="text-large text-right text-gray-700">
        //                     {provider.name}
        //                   </h3>
        //                   <h3 className="text-sm text-right text-gray-500">
        //                     {provider.instition}
        //                   </h3>
        //                 </div>
        //               </div>
        //               <hr className="border-t border-gray-300 my-4" />
        //               <div className="text-center sm:mt-2">
        //                 <TypeCard />
        //               </div>
        //             </div>
        //             <div className="mt-10 sm:mt-6">
        //               <button
        //                 type="button"
        //                 className="inline-flex w-full mt-8 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //                 onClick={closeModal}
        //               >
        //                 Go back to dashboard
        //               </button>
        //             </div>
        //           </Dialog.Panel>
        //         </Transition.Child>
        //       </div>
        //     </div>
        //   </Dialog>
        // </Transition.Root>
      )}

      <div className="items-center justify-center">
        <div className="h-24 r lg:w-24 flex-none rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/img/jonathan.jpg"
            alt="Jonathan"
          />
        </div>
      </div>

      <div className="p-2 flex flex-col leading-normal w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-700 text-lg font-semibold">
              {provider.first_name} {provider.last_name}, {provider.credential}
            </p>
            <p className="text-gray-900 leading-none text-sm ">
              {provider.institutions[0].name}
            </p>
          </div>

          <p className="text-gray-700 text-md ">{provider.specialization}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm mt-2 flex flex-row">
            {uniqueCancerTypes.map((providerCase) => (
              <div className="mr-2">
                {cancerTypeBadge(provider.cases, providerCase, openModal)}
              </div>
            ))}

            <p className="text-gray-600">
              {provider.city}, {provider.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const cancerTypeBadge = (cases, cancerType, openModal) => {
  //filter through the cases and return a count of the number of cases that match the type cancerType.id passed in

  const count = cases.filter((providerCase) => {
    return providerCase.cancer_type.id === cancerType.id;
  }).length;

  switch (cancerType.id) {
    case 10:
      return (
        <div
          onClick={() => openModal(cancerType)}
          className="inline-flex items-center rounded-md bg-yellow-400/10 border-yellow-500 border-1 shadow-lg px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20"
        >
          {`(${count}) ${cancerType.name}`}
        </div>
      );
    case 25:
      return (
        <div
          onClick={() => openModal(cancerType)}
          className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium shadow-lg text-green-500 ring-1 ring-inset ring-green-400/20"
        >
          {`(${count}) ${cancerType.name}`}
        </div>
      );
    case 'Lung':
      return (
        <div className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium shadow-lg text-blue-500 ring-1 ring-inset ring-blue-400/20">
          {`(${count}) ${cancerType.name}`}
        </div>
      );
    default:
      return null;
  }
};
