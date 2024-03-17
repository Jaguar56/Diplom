import { useContext, useState } from "react";
import "../assets/css/profile.css";
import Avatar from "./Avatar";
import { Context } from "../context/Context";
import { v4 as getID } from "uuid";
import { updateUserAsync } from "../services/chatServices";
import { updateProfile } from "../context/Actions";

export default function Profile({ open, setOpen }) {
  const { auth, user, dispatch } = useContext(Context);
  const [onEdit, setOnEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleOnEdit = () => {
    if (!user) return;
    setUsername(user.username);
    setDesc(user.desc);
    setOnEdit(true);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setOnEdit(false);
  };

  const handleImages = (event) => {
    const file = event.target.files[0];
    const Image = {
      origin: file.name,
      filename: getID() + "-" + file.name,
      file,
    };
    setProfileImage(Image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tempUser = {
        username,
        desc: desc ? desc : "Всем привет!!!",
      };

      const res = await updateUserAsync(tempUser, profileImage);
      if (res) {
        dispatch(updateProfile(res));
      }
      setOnEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={open ? "profile active" : "profile"}>
      <div className="profile-wrapper">
        <div className="profile-topbar">
          <span className="heading">Профиль</span>
          <div className="app-icon" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {onEdit ? (
          <div className="profile-infos">
            <div className="avatar-wrapper">
              {profileImage ? (
                <Avatar
                  src={URL.createObjectURL(profileImage.file)}
                  height={150}
                  width={150}
                />
              ) : (
                <Avatar
                  src={user?.profile ? user.profile.url : ""}
                  height={150}
                  width={150}
                />
              )}
              <label htmlFor="upload-image">
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="upload-image"
                  onChange={handleImages}
                />
                <i className="fa-solid fa-camera"></i>
              </label>
            </div>
            <form onSubmit={handleSubmit} className="profile-form">
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Имя пользователя"
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="Напишите что-нибудь о себе"
              />
              <div className="profile-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Отменить
                </button>
                <button type="submit" className="save-btn">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-infos">
            <div className="avatar-wrapper">
              <Avatar
                src={user?.profile ? user.profile.url : ""}
                height={150}
                width={150}
              />
            </div>
            <span className="username">{user?.username}</span>
            <span className="email">{user?.email}</span>
            <p className="status">{user?.desc}</p>
            <button className="edit-btn" onClick={handleOnEdit}>
              <i className="fa-solid fa-pen-to-square"></i>Профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
