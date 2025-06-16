import { Link } from 'react-router-dom';
import { FcManager, FcFullTrash ,FcDataRecovery } from "react-icons/fc"; // ← 使い䛯いアイコンをインポート
import { useState, useEffect } from 'react';

function Navigation() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // 現在時刻を取得
    };

    const updateDate = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString()); // 現在日付を取得
    };

    const interval = setInterval(updateTime, 1000); // 時刻を更新
    updateDate(); // 初回の日時取得
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-red-300 pt-6 text-center relative">
      <div className="absolute left-2 top-2 text-2xl text-yellow-100"> {/* 日付表示部分 */}
        <strong>{currentDate}</strong> {/* 日付を太字に設定 */}
      </div>
      <div className="absolute right-2 top-2 text-2xl text-blue-800"> {/* 時刻表示部分 */}
        <strong>{currentTime}</strong> {/* 時刻を太字に設定 */}
      </div>
      <strong>
        <span className='it'>ToDoアプリケーション</span>
        <br></br>
        <br></br>
        <Link to="/">Today's Schedule</Link> |
        <Link to="/add"> Add Schedule</Link> |
        <Link to="/delete"> Delete Schedule</Link> |
        <Link to="/After"> After Schedule</Link>
      </strong>
    </nav>
  );
}

export default Navigation;
