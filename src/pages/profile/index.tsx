import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const session = useSession();
  return (
    <div>
      <h1>Profile Page</h1>
      {session.data && (
        <div>
          <h2>{session.data.user!.email}</h2>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
