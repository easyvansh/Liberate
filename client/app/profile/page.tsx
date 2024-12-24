import { auth } from "../lib/firebase";

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Profile</h1>
      <p><strong>Name:</strong> {user?.displayName || "Anonymous"}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default Profile;
