
export default function ExpiredTip() {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-3xl text-gray-800 dark:text-white mt-3">Magic link expired</div>
      <p className="text-center text-gray-400 mb-6">Go back to your original VoceChat tab and request a new magic link.</p>
      <p className="text-center text-gray-400">You can close this window now.</p>
    </div>
  );
}
