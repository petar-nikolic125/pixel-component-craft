const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen grid place-items-center text-center p-6">
    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{title}</h1>
    <p className="text-lg text-gray-400 max-w-md">
      This page is under construction — check back soon!
    </p>
  </div>
);

export default Placeholder;
