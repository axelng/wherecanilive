import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to WhereCanILive</h1>
      <p>
        A new way to explore housing, cost of living, and future planning. It&rsquo;s fast and it&rsquo;s smart.
      </p>
      <Link href="/map">
        <span className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 inline-block">
          Get Started
        </span>
      </Link>
    </div>
  );
}