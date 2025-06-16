import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function DeleteUser() {
  const [users, setUsers] = useState([]);

  // Firestoreからユーザー一覧を取得
  const fetchUsers = async () => {
    const usersCol = collection(db, 'finale');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id, // データ削除時に必要なdoc.idを追加
      ...doc.data()
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ユーザー削除関数
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('本当に削除しますか？');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'finale', id)); // IDで特定し削除
      alert('削除しました');
      fetchUsers(); // 再取得
    } catch (error) {
      alert('削除に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <h2><strong>ユーザー削除</strong></h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.time} - {user.name} </strong>
            &nbsp;
            <button 
                  onClick={() => deleteUser(user.id)} 
                  className="text-white bg-green-600 px-2 py-1 rounded">
                  <strong>削除</strong>
                </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteUser;
