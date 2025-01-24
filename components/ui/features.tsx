export default function Features(){
  return (
    <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <!-- Feature 1 --> */}
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h11M9 21V3m6 6l6 6-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feature One</h3>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            {/* <!-- Feature 2 --> */}
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c0-2.5-2-4-4-4s-4 1.5-4 4 2 4 4 4 4-1.5 4-4zm6 4h2a2 2 0 01-2 2v1m0-7v3m4 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6v6a4 4 0 004 4h2a4 4 0 004-4V6m2 4h.01M6 10h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}