import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center animate-in fade-in duration-500">
      {/* This one line of code renders a massive, fully-functional profile dashboard! */}
      <UserProfile routing="hash" />
    </div>
  );
}