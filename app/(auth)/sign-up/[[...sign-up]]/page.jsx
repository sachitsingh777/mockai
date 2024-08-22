import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Join Mock AI Today!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Get personalized interview guidance and ace your next job application.
        </p>
        <SignUp
          appearance={{
            elements: {
              card: "shadow-none",
              headerTitle: "text-2xl font-semibold text-gray-800",
              headerSubtitle: "text-sm text-gray-500",
              formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full",
            },
          }}
        />
      </div>
    </div>
  );
}
