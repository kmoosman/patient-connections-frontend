'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import {
  ChevronUpDownIcon,
  PencilIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import Layout from '../../components/layouts/Layout';
import { useRouter } from 'next/router';
import { useProfile, usePatchProfile, usePatchAccess } from '@/hooks/api';
import { calculateAge, addLineBreaks } from '@/utils/helpers';
import { toast } from 'react-hot-toast';
import { data } from 'autoprefixer';
import { queryClient } from '@/queryClient';

// const user = {
//   primaryCancerCenter: 'MD Anderson Cancer Center',
//   age: 45,
//   currentStage: 'IV',
//   name: 'Anonymous',
//   email: 'tom@apple.com',
//   cancerType: 'Kidney Cancer',
//   subType: 'Clear Cell',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProfilePage = () => {
  const router = useRouter();
  //this should be done with an actual user check - this is a placeholder
  const { id, nonuser } = router.query;
  const { data: user, isLoading, error } = useProfile(id);
  const { mutate } = usePatchAccess(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedCancer, setSelectedCancer] = React.useState('');
  const [selectedSubType, setSelectedSubType] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [isToggled, setIsToggled] = useState();
  const [accessLevel, setAccessLevel] = useState(2);

  useEffect(() => {
    if (user) {
      setIsToggled(user.user.access_level === 2);
    }
  }, [user]);

  // const queryClient = new QueryClient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleToggle = () => {
    // Prepare data for PATCH request
    const updatedAccessLevel = !isToggled ? 2 : 1;
    const payload = {
      id: user.user.id,
      data: {
        access_level: updatedAccessLevel,
        // Include other fields to update
      },
    };

    mutate(payload, {
      onSuccess: (data) => {
        // Handle successful response
        console.log('Profile updated:', data);
        toast.success('Profile updated');
        setIsToggled(!isToggled);
        queryClient.invalidateQueries('profile');
      },
      onError: (error) => {
        // Handle error
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
      },
    });
  };

  const commonCancerTypes = [
    { id: 1, name: 'Breast Cancer' },
    { id: 2, name: 'Lung Cancer' },
    { id: 3, name: 'Prostate Cancer' },
    { id: 4, name: 'Colorectal Cancer' },
    { id: 5, name: 'Bladder Cancer' },
    { id: 6, name: 'Melanoma' },
    { id: 7, name: 'Non-Hodgkin Lymphoma' },
    { id: 8, name: 'Thyroid Cancer' },
    { id: 9, name: 'Kidney Cancer' },
    { id: 10, name: 'Leukemia' },
  ];

  const subtypeOptions = {
    'Breast Cancer': ['Subtype 1', 'Subtype 2', 'Subtype 3'],
    'Lung Cancer': ['Subtype 1', 'Subtype 2'],
    'Prostate Cancer': ['Subtype 1', 'Subtype 2', 'Subtype 3', 'Subtype 4'],
    // Add more subtypes for other cancer types
  };

  //   const handleCancerTypeChange = (e) => {
  //     const selectedType = e.target.value;
  //     setSelectedCancer(selectedType);
  //     setSelectedSubType('');
  //     setValue('subType', ''); // Reset the subtype field
  //   };

  const handleCancerTypeChange = (selectedType) => {
    setValue('cancerType', selectedType);
    setSelectedCancer(selectedType);
  };

  const handleSubTypeChange = (e) => {
    setSelectedSubType(e.target.value);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (data) => {
    setIsEditing(false);
    setSelectedCancer(data.cancerType);
    setSelectedSubType(data.subType);
    setBio(data.bio);
  };

  return (
    <Layout>
      <div className="flex w-full h-full flex-col p-4 mt-2">
        <div className="bg-white ml-48 mr-48 h-2/3 shadow-lg  rounded-md pr-14">
          <div className="mr-2 mt-4 flex flex-row">
            <div className="flex flex-col w-1/3">
              <img
                className="w-32 h-32 mt-8 p-4 rounded-full justify-center self-center"
                src="/img/patient.jpg"
                alt="Profile"
              />
              {!nonuser ? (
                <label className="flex flex-col items-center cursor-pointer">
                  <div
                    className="ml-3 text-gray-700 font-medium text-sm justify-center
              text-center w-full mb-1"
                  >
                    Anonymous
                  </div>
                  <div className="relative w-10 h-5">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isToggled}
                      onChange={handleToggle}
                    />
                    <div
                      className={`block w-full h-full rounded-full ${
                        isToggled ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                        isToggled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                      style={{ zIndex: '1' }}
                    ></div>
                  </div>
                </label>
              ) : null}
            </div>
            {user && (
              <form
                className="w-full"
                onSubmit={handleSubmit(handleSaveProfile)}
              >
                <div className="mt-10">
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <input
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="name"
                          type="text"
                          defaultValue={user.name}
                          {...register('name', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="age"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="age"
                          defaultValue={user.age}
                          {...register('age', { required: true })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row ">
                          <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">
                              {!isToggled ? (
                                <div className="w-full col-span-5">
                                  {user?.user.first_name + ' '}
                                  {user.user.last_name}
                                </div>
                              ) : (
                                <div>Anonymous</div>
                              )}
                            </h2>
                            <div className="flex flex-col">
                              <h2 className="text-md font-medium">
                                Age: {calculateAge(user.user.dob)}
                              </h2>
                              <h2 className="text-md font-medium">
                                Stage: {user.user.current_stage}
                              </h2>
                            </div>
                          </div>

                          {!isEditing ? (
                            <button
                              type="button"
                              onClick={handleEditProfile}
                              className="text-indigo-500 py-1 px-3 rounded w-10 h-10"
                            >
                              {/* <PencilIcon /> */}
                            </button>
                          ) : null}
                        </div>
                        <EnvelopeIcon className="text-slate-300 w-12 h-12" />
                      </div>
                      <hr className="border-t w-full border-gray-300 my-4" />
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-6">
                  <div>
                    <label className="font-bold mb-2 mt-0">Cancer Center</label>
                    <p>{user.user.hospital}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {isEditing ? (
                    <Listbox
                      value={watch('cancerType')}
                      onChange={handleCancerTypeChange}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                            Cancer Type
                          </Listbox.Label>
                          <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <span className="block truncate">
                                {selectedCancer.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {commonCancerTypes.map((cancerType) => (
                                  <Listbox.Option
                                    key={cancerType.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? 'bg-indigo-600 text-white'
                                          : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                      )
                                    }
                                    value={cancerType}
                                  >
                                    {({ selectedCancer, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selectedCancer
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'block truncate'
                                          )}
                                        >
                                          {cancerType.name}
                                        </span>

                                        {selectedCancer ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600',
                                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  ) : (
                    <div className="flex flex-row gap-6 mt-4">
                      <div>
                        <label className="font-bold mb-2">Cancer Type</label>
                        <p>{user.user.cancer_type.name}</p>
                      </div>
                      <div className="mb-2">
                        <label className="font-bold">Subtype</label>
                        <div>{user.user.cancer_subtype.name}</div>
                      </div>
                    </div>
                  )}
                </div>
                {!isToggled ? (
                  <div className="mb-4">
                    <label className="font-bold">Bio</label>
                    {/* {isEditing ? (
                    <textarea
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your bio"
                      {...register('bio', { required: true })}
                    />
                  ) : ( */}
                    <div>{addLineBreaks(user.user.bio ?? '')}</div>
                    {errors.bio && (
                      <span className="text-red-500">
                        Please enter your bio
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-4"></div>
                )}

                {isEditing ? (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : null}
              </form>
            )}
          </div>
          <div className="flex w-full mt-10 flex-col mb-4"></div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
