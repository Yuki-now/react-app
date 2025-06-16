import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate(); // ページ遷移用

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'finale'), {
        time,
        name
      });
      alert('ユーザーを追加しました');
      navigate('/'); // 追加後トップページへ戻る
    } catch (error) {
      alert('追加に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center"> 
      <h1><strong>ユーザー追加</strong></h1>
      <form onSubmit={handleSubmit}>
        <div >
          <label><strong>time：</strong></label>
          <input value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label><strong>name：</strong></label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit"><strong>追加</strong></button>
      </form>
    </div>
  );
}

export default AddUser;
