import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  // Extract email from query parameters
  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/users.json"); // Ensure users.json is in the public folder
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const users = await response.json();

        // Find the user with the given email
        const user = users.find((u) => u.email === email);
        if (user) {
          setUserData(user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [email]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Display user details
  const { firstname, lastname, username, profile, education, work_experience } =
    userData;

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Basic Information</h2>
      <p>First Name: {firstname}</p>
      <p>Last Name: {lastname}</p>
      <p>Username: {username}</p>
      <p>Email: {profile?.contact_information?.email}</p>
      <p>Bio: {profile?.bio}</p>
      <h2>Education</h2>
      {education?.map((edu, index) => (
        <div key={index}>
          <p>University: {edu.university}</p>
          <p>Degree: {edu.degree}</p>
          <p>Duration: {edu.duration}</p>
        </div>
      ))}
      <h2>Work Experience</h2>
      {work_experience?.map((work, index) => (
        <div key={index}>
          <p>Organization: {work.organization}</p>
          <p>Position: {work.position}</p>
          <p>
            Duration: {work.start_date} - {work.end_date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
