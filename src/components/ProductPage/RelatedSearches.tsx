const related = [
    "summer fridays",
    "peak design",
    "mavala",
    "essie polish",
    "cosmetics",
    "opi nail varnish",
    "it cosmetics",
  ];
  
  export default function RelatedSearches() {
    return (
      <div className="mt-14">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Related Searches</h4>
        <div className="flex flex-wrap gap-2">
          {related.map((tag, idx) => (
            <button
              key={idx}
              className="bg-white border border-blue-300 text-blue-700 px-3 py-1 text-sm rounded hover:bg-blue-100 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  }
  