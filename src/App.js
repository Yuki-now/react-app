import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddUser from './add';
import DeleteUser from './delete';
import FindUser from './after';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// EditableRowコンポーネントを追加
function EditableRow({ userData, updateUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTime, setEditableTime] = useState(userData.time);
  const [editableName, setEditableName] = useState(userData.name);

  const handleSave = () => {
    setIsEditing(false);
    updateUserData(userData.id, { time: editableTime, name: editableName });
  };

  return (
    <tr className="border-b-2 border-gray-400">
      <td className="p-4 border-2 border-blue-500 text-center">
        {isEditing ? (
          <input
            type="text"
            value={editableTime}
            onChange={(e) => setEditableTime(e.target.value)}
            className="w-full text-center"
          />
        ) : (
          <strong>{editableTime}</strong>
        )}
      </td>
      <td className="p-4 border-2 border-red-500 text-center">
        {isEditing ? (
          <input
            type="text"
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
            className="w-full text-center"
          />
        ) : (
          editableName
        )}
      </td>
      <td className="p-4 text-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="p-2 bg-green-500 text-white rounded"
          >
            保存
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            編集
          </button>
        )}
      </td>
    </tr>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [dbUsers, setdbUsers] = useState([]); // Firestoreのデータ

  useEffect(() => {
    // Firestoreからusersコレクションを取得
    const fetchUsers = async () => {
      try {
        const usersCol = collection(db, 'finale');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setdbUsers(userList);
      } catch (error) {
        console.error('Firestoreからのデータ取得エラー:', error);
      }
    };

    fetchUsers(); // データ取得呼び出し

    // 認証状態を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  // Googleログイン処理
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  // ユーザデータ更新処理
  const updateUserData = (id, updatedData) => {
    const updatedUsers = dbUsers.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    setdbUsers(updatedUsers);
  };

  return (
    <Router>
      <Navigation />
      <div className="p-4 flex justify-end bg-red-200">
        {user ? (
          <div>
            <span className="mr-4">
              <strong>Hello、 {user.displayName} </strong>
            </span>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 text-white rounded"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Googleでログイン
          </button>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center">
              <table className="border-collapse border border-green-400">
                <thead>
                  <tr>
                    <th className="p-4 border-2 border-blue-500 text-center">
                      Time
                    </th>
                    <th className="p-4 border-2 border-red-500 text-center">
                      Name
                    </th>
                    <th className="p-4 border-2 border-green-500 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user ? (
                    dbUsers.map((dbUser) => (
                      <EditableRow
                        key={dbUser.id}
                        userData={dbUser}
                        updateUserData={updateUserData}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-gray-600 mt-4 text-center"
                      >
                        ログインするとデータが見られます。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          }
        />
        {user ? (
          <>
            <Route path="/add" element={<AddUser />} />
            <Route path="/delete" element={<DeleteUser />} />
            <Route path="/after" element={<FindUser />} />
          </>
        ) : (
          <>
            <Route path="/add" element={<p>ログインしてください</p>} />
            <Route path="/delete" element={<p>ログインしてください</p>} />
            <Route path="/after" element={<p>ログインしてください</p>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
