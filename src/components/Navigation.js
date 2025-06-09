// src/components/Navigation.js
import { Link } from 'react-router-dom';
import { FcManager, FcFullTrash ,FcDataRecovery } from "react-icons/fc"; // ← 使い䛯いアイコンをインポート

function Navigation() {
return (
<nav className="bg-gray-100 pt-6 text-center">
<Link to="/"><FcManager style={{ display:'inline-block', marginRight: '5px' }} />一覧</Link> |
<Link to="/add"><FcDataRecovery style={{ display:'inline-block', marginRight: '5px' }} />ユーザー追加 </Link> |
<Link to="/delete"><FcFullTrash style={{ display:'inline-block', marginRight: '5px' }} />ユーザー削除 </Link> |
<Link to="/find">検索</Link>
</nav>
);
}

export default Navigation;