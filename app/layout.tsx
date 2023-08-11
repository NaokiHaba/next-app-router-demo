import { Noto_Sans_JP } from 'next/font/google'
import Header from "@/app/header";
import './globals.css';

// 1. フォントの読み込み
const NotoSansJP = Noto_Sans_JP({
    weight: [ "400", "700" ],
    subsets: [ "latin" ],
    preload: true,
});


export const metadata = {
    title: 'Next.js Awesome Memo App',
    description: 'Generated by create next app',
}

// 2. ページのレイアウト
export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }) {
    return (
        <html lang="ja">
        <body className={NotoSansJP.className}>
        {/* 7. 共通ヘッダー */}
        <Header></Header>
        {children}
        </body>
        </html>
    )
}