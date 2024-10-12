"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

const HomePage = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl border dark:border-slate-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Welcome to Your Application
      </h1>

      {!isSignedIn ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Please sign up to get started with your account. Create and manage
            your bills easily!
          </p>
          <Button color="primary" size="lg">
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Welcome back, {user?.firstName}!
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
