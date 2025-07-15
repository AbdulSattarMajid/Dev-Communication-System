// Components/Channels/ChannelCard.jsx
import { MoreVertical } from "lucide-react"

const ChannelCard = ({ channel, openDropdownId, setOpenDropdownId, onEdit, onDelete }) => (
  <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 shadow-md rounded-xl w-full p-4 flex flex-col items-center hover:shadow-xl transition-transform duration-200">
    <div className="text-yellow-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 4H2v16h20V6H12l-2-2z" />
      </svg>
    </div>

    <div className="text-sm font-semibold text-gray-700 truncate w-full text-center">
      {channel.name}
    </div>

    <button
      onClick={() => setOpenDropdownId(openDropdownId === channel.id ? null : channel.id)}
      className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
    >
      <MoreVertical size={18} />
    </button>

    {openDropdownId === channel.id && (
      <div className="absolute top-10 right-2 z-10 bg-white border shadow rounded w-28 text-sm">
        <button
          onClick={() => {
            onEdit(channel.id)
            setOpenDropdownId(null)
          }}
          className="w-full px-3 py-2 text-left hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(channel.id)
            setOpenDropdownId(null)
          }}
          className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    )}
  </div>
)

export default ChannelCard
