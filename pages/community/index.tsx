import Link from "next/link";

export default function CommunityPage() {
  return (
    <div>
      <h1>バーチャルコミュニティ</h1>
      <Link href="/community/chat">チャットへ</Link>
      {/* イベントリスト表示など */}
    </div>
  );
}
