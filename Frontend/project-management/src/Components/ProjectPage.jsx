// Components/Projects/ProjectPage.jsx
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ProjectInfo from "./ProjectInfo"
import CreateChannelForm from "../Channels/CreateChannelForm"
import ChannelCard from "../Channels/ChannelCard"

const ProjectPage = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [channelName, setChannelName] = useState("")
  const [channels, setChannels] = useState([])
  const [openDropdownId, setOpenDropdownId] = useState(null)

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || []
    const foundProject = savedProjects.find(p => String(p.id) === id)
    if (foundProject) {
      setProject(foundProject)
      setChannels(foundProject.channels || [])
    }
  }, [id])

  const updateLocalStorageChannels = (updatedChannels) => {
    const allProjects = JSON.parse(localStorage.getItem("projects")) || []
    const updatedProjects = allProjects.map((p) =>
      String(p.id) === id ? { ...p, channels: updatedChannels } : p
    )
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const handleAddChannel = (e) => {
    e.preventDefault()
    if (!channelName.trim()) return

    const newChannel = { id: Date.now(), name: channelName.trim() }
    const updated = [newChannel, ...channels]
    setChannels(updated)
    setChannelName("")
    updateLocalStorageChannels(updated)
  }

  const handleDeleteChannel = (channelId) => {
    if (!window.confirm("Delete this channel?")) return
    const updated = channels.filter((ch) => ch.id !== channelId)
    setChannels(updated)
    updateLocalStorageChannels(updated)
  }

  const handleEditChannel = (channelId) => {
    const name = prompt("Enter new channel name:")
    if (!name) return
    const updated = channels.map((ch) =>
      ch.id === channelId ? { ...ch, name } : ch
    )
    setChannels(updated)
    updateLocalStorageChannels(updated)
  }

  if (!project) return <div className="p-6">Project not found</div>

  return (
    <div className="p-6 space-y-6">
      <ProjectInfo project={project} />
      <CreateChannelForm
        channelName={channelName}
        setChannelName={setChannelName}
        handleAddChannel={handleAddChannel}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Channels</h2>
        {channels.length === 0 ? (
          <p className="text-gray-500 italic">No channels yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
                onEdit={handleEditChannel}
                onDelete={handleDeleteChannel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPage
