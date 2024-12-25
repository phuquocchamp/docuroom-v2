

function Category() {
  return (
    <div>
    <h2 className="font-semibold text-lg mb-4">Category</h2>
    {/* Sử dụng grid responsive */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-6">
      {["Korean", "Computer Network", "Software Technology", "English"].map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-lg px-6 py-4 shadow-lg flex items-center space-x-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          <img src="/group/folder.png" alt={category} className="w-12 h-12" />
          <p className="font-semibold text-base">{category}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Category