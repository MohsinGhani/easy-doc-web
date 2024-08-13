import React from "react";

const ProfilesFoundCount = ({
  count,
  text,
}: {
  count: number;
  text: string;
}) => {
  return (
    <p className="text-2xl font-semibold leading-10">
      <span className="text-primary">{count}</span>{" "}
      <span className="text-gray-800">{text}</span>
    </p>
  );
};

export default ProfilesFoundCount;
