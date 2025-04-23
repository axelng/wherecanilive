import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">WhereCanILive</h1>
        <p className="text-lg text-gray-600 mb-8">
          Type your life. Find your place.
          A new way to explore housing, cost of living, and future planning.
        </p>
        import Link from 'next/link';

// ...

<Link href="/map">
  <span className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 inline-block">
    Get Started
  </span>
</Link>
      </div>
    </div>
  );
}