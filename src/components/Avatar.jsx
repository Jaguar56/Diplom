import NoAvatar from "../assets/images/noavatar.png"

export default function Avatar({ src, username, height, width }) {
  return (
    <div className='d-flex-row'>
      <img src={src ? src : NoAvatar} alt="" style={{
        height: `${height}px`,
        width: `${width}px`,
        objectFit: `cover`,
        borderRadius: `0.5rem`,
      }} />
      {username && (
        <span className="username" style={{
          fontSize: "1rem"
        }}>{username ? username : "Пользователь"}
        </span>
      )}
    </div>
  )
}
