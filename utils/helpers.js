import axios from 'axios';
import React from 'react';

export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  const hasBirthdayOccurred =
    currentDate.getMonth() > dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() >= dob.getDate());

  // Subtract 1 from the age if the birthday hasn't occurred yet
  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
}

export const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    const results = response.data.results;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }
  } catch (error) {
    console.error('Error retrieving coordinates:', error);
  }

  return null;
};

export function addLineBreaks(text) {
  const lines = text.split('/n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

export function getFormattedStage(number) {
  switch (number) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    case 4:
      return 'IV';
    default:
      return 'N/A';
  }
}
