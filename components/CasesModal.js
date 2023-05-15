import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TypeCard from './TypeCard';

export default function CasesModal({
  provider,
  selectedCancerType,
  fragment,
  closeModal,
}) {
  const filteredCases = provider.cases.filter(
    (caseItem) => caseItem.cancer_type.id === selectedCancerType.id
  );

  return (
    <Transition.Root show={true} as={fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-2/3 sm:p-6">
                <div className="h-96 overflow-auto">
                  <div className="bg-indigo-100 p-4 flex flex-row justify-between rounded">
                    <h1 className="text-2xl font-semibold self-center text-gray-900">
                      {selectedCancerType.name} Cancer
                    </h1>
                    <div>
                      <h3 className="text-large text-right text-gray-700">
                        {provider.first_name} {provider.last_name},{' '}
                        {provider.credential}
                      </h3>
                      <h3 className="text-sm text-right text-gray-500">
                        {provider.institutions[0].name}
                      </h3>
                    </div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="text-center sm:mt-2">
                    <TypeCard type={selectedCancerType} cases={filteredCases} />
                  </div>
                </div>
                <div className="mt-10 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full mt-8 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={closeModal}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
