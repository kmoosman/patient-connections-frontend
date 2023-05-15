'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import {
  ChevronUpDownIcon,
  PencilIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import Layout from '../../components/layouts/Layout';
import EntryForm from '@/components/EntryForm';

const user = {
  primaryCancerCenter: 'MD Anderson Cancer Center',
  age: 45,
  name: 'Anonymous',
  email: 'tom@apple.com',
  cancerType: 'Kidney Cancer',
  subType: 'Chromophobe Cell',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProfilePage = () => {
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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
  };

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

  useEffect(() => {
    setSelectedCancer(user.cancerType);
    setSelectedSubType(user.subType);
    setBio(user.bio);
  }, []);

  return (
    <Layout>
      <div className="flex w-full h-full flex-col p-4 mt-2">
        <div className="bg-white ml-48 mr-48 h-2/3 shadow-lg rounded rounded-md pr-14">
          <div className="mr-2 flex flex-col ml-14">
            <div className="mt-10">
              <div>
                <div className="flex flex-col mb-5">
                  <h2 className="text-2xl font-bold">Specialty</h2>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row ">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      {categories.map((category) => (
                        //category boxes
                        <div
                          key={category.id}
                          className={`text-center h-20 font-medium flex items-center justify-center rounded shadow-lg bg-indigo-500 text-white p-4 box ${
                            selectedCategory === category.id
                              ? 'border-black border-opacity-40 border-4'
                              : ''
                          }`}
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <EntryForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

const categories = [
  { id: 1, name: 'Oncology' },
  { id: 2, name: 'Radiation' },
  { id: 3, name: 'Surgery' },
  { id: 4, name: 'Interventional Radiology' },
];
