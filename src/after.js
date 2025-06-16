import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function FindUserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", event: "" });
  const [editUserId, setEditUserId] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", event: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCol = collection(db, 'finale2');
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
      setFilteredUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const kw = e.target.value;
    setKeyword(kw);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(kw.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = async () => {
    if (newUser.name && newUser.event) {
      await addDoc(collection(db, 'finale2'), newUser);
      setNewUser({ name: "", event: "" });
      window.location.reload(); // リスト更新
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, 'finale2', id));
    window.location.reload(); // リスト更新
  };

  const handleEditUser = (id, name, event) => {
    setEditUserId(id);
    setEditedData({ name, event });
  };

  const handleSaveEdit = async (id) => {
    const docRef = doc(db, 'finale2', id);
    await updateDoc(docRef, editedData);
    setEditUserId(null);
    window.location.reload(); // リスト更新
  };

  return (
    <div className="flex flex-col items-center text-2xl p-20">
      <h2><strong>今後の予定</strong></h2>
      <table className="border-collapse border border-gray-600 mb-4">
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-b-2 border-gray-600">
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    className="p-2 border"
                  />
                ) : (
                  <strong className="text-red-500">{user.name}</strong>
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedData.event}
                    onChange={(e) => setEditedData({ ...editedData, event: e.target.value })}
                    className="p-2 border"
                  />
                ) : (
                  user.event
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <button
                    onClick={() => handleSaveEdit(user.id)}
                    className="text-white bg-green-500 px-2 py-1 rounded"
                  >
                    保存
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditUser(user.id, user.name, user.event)}
                      className="text-white bg-blue-500 px-2 py-1 rounded"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-white bg-red-500 px-2 py-1 rounded ml-2"
                    >
                      削除
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>新しい予定を追加</h3>
      <input
        type="text"
        placeholder="名前"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        placeholder="イベント"
        value={newUser.event}
        onChange={(e) => setNewUser({ ...newUser, event: e.target.value })}
        className="mb-2 p-2 border"
      />
      <button
        onClick={handleAddUser}
        className="text-white bg-blue-500 px-4 py-2 rounded"
      >
        追加
      </button>
    </div>
  );
}

export default FindUserPage;
