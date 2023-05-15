'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useForm, Controller } from 'react-hook-form';
import {
  ChevronUpDownIcon,
  PencilIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import { ComboboxSelectOption } from '@/components/ComboboxSelectOption';
import SelectDropdown from './SelectDropdown';
import { Route } from 'react-router-dom';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const people = [
  { id: 1, name: 'John Dorian, MD, PHD' },
  { id: 2, name: 'Elliot Reid, MD' },
  { id: 3, name: 'Devon Webb, MD' },
  { id: 4, name: 'Tom Cook, DO' },
  { id: 5, name: 'Tanya Fox, MD' },
  { id: 6, name: 'Hellen Schmidt, MD' },
];

const years = [
  { id: 1, name: '2021' },
  { id: 2, name: '2020' },
  { id: 3, name: '2019' },
  { id: 4, name: '2018' },
  { id: 5, name: '2017' },
  { id: 6, name: '2016' },

  { id: 7, name: '2015' },
  { id: 8, name: '2014' },
  { id: 9, name: '2013' },
  { id: 10, name: '2012' },
  { id: 11, name: '2011' },

  { id: 12, name: '2010' },
  { id: 13, name: '2009' },
  { id: 14, name: '2008' },
  { id: 15, name: '2007' },
  { id: 16, name: '2006' },
];

const stages = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
];

const EntryForm = () => {
  const { handleSubmit, control, watch } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
    Route.push('/');
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row mt-4 justify-between">
        <div className="flex flex-col">
          <label className="font-medium px-1 mb-1 mt-4">Physican</label>
          <Controller
            name="physician"
            control={control}
            defaultValue={people[0]} // Set the default value
            render={({ field }) => (
              <SelectDropdown
                size="w-[750px]"
                {...field}
                onChange={(value) => field.onChange(value)}
                options={people ?? []}
              />
            )}
          />
        </div>
      </div>

      <div className=" mt-8 justify-between grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="font-medium px-1">Year</label>
          <Controller
            name="year"
            control={control}
            defaultValue={years[0]} // Set the default value
            render={({ field }) => (
              <SelectDropdown
                size="w-100"
                {...field}
                onChange={(value) => field.onChange(value)}
                options={years ?? []}
              />
            )}
          />
        </div>
        <div className="flex flex-col z-0">
          <label className="font-medium px-1">Stage at intervention</label>
          <Controller
            name="interventionStage"
            control={control}
            defaultValue={stages[0]} // Set the default value
            render={({ field }) => (
              <SelectDropdown
                size="w-46"
                {...field}
                onChange={(value) => field.onChange(value)}
                options={stages ?? []}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium px-1">Current stage</label>
          <Controller
            name="currentStage"
            control={control}
            defaultValue={stages[0]} // Set the default value
            render={({ field }) => (
              <SelectDropdown
                size="w-46"
                {...field}
                onChange={(value) => field.onChange(value)}
                options={stages ?? []}
              />
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 text-white py-1 px-3 mt-14 mb-10 rounded h-10"
      >
        Submit
      </button>
    </form>
  );
};

export default EntryForm;

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

const categories = [
  { id: 1, name: 'Oncology' },
  { id: 2, name: 'Radiation' },
  { id: 3, name: 'Surgery' },
  { id: 4, name: 'Interventional Radiology' },
];
