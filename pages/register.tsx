import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import InputForm from '@components/register/InputForm';



type ChatMessage = {
  type: 'bot' | 'user'
  content: string | React.ReactNode
  id: string
}

type UserData = {
  name: string
  nickname: string
  height: number
  weight: number
  gender: 'male' | 'female' | 'other'
  targetBody: string
  symptoms: string[]
}

export default function Register() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<Partial<UserData>>({})
  const chatEndRef = useRef<HTMLDivElement>(null)

  const bodyTypeOptions = [
    { id: 'slim', label: 'スリム・引き締め' },
    { id: 'muscle', label: '筋肉質・アスリート体型' },
    { id: 'healthy', label: 'バランスの取れた健康体型' },
    { id: 'diet', label: 'ダイエット重視' },
  ]

  const symptomOptions = [
    '肩こり', '腰痛', '膝の痛み', '疲れやすい',
    '冷え性', '不眠', '頭痛', 'ストレス'
  ]

  useEffect(() => {
    // 初期メッセージ
    addBotMessage(
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-4 relative bg-primary-light rounded-full flex items-center justify-center">
          <span className="text-3xl text-white">🤖</span>
        </div>
        <p className="text-lg mb-2">こんにちは！ウェルテラスのウェルビーです。🌟</p>
        <p className="mb-2">一緒に健康な未来への第一歩を踏み出しましょう！</p>
        <p>まずはお名前を教えていただけますか？</p>
      </div>
    )
  }, [])

  const addBotMessage = (content: string | React.ReactNode) => {
    setMessages(prev => [...prev, {
      type: 'bot',
      content,
      id: `bot-${Date.now()}`
    }])
  }

  const handleSubmit = (value: any) => {
    // ユーザーの回答を表示
    setMessages(prev => [...prev, {
      type: 'user',
      content: typeof value === 'object' 
        ? `身長: ${value.height}cm, 体重: ${value.weight}kg`
        : value,
      id: `user-${Date.now()}`
    }])

    // 次のステップのメッセージを表示
    setTimeout(() => {
      switch (currentStep) {
        case 0:
          setUserData(prev => ({ ...prev, name: value }))
          addBotMessage(
            <div>
              <p>{value}さん、はじめまして！🎉</p>
              <p className="mt-2">続いて、ニックネームを教えていただけますか？</p>
              <p className="text-sm text-gray-600">※ホーム画面での表示名として使用させていただきます</p>
            </div>
          )
          break
        case 1:
          setUserData(prev => ({ ...prev, nickname: value }))
          addBotMessage(
            <div>
              <p>ありがとうございます！</p>
              <p className="mt-2">続いて、身長と体重を教えていただけますか？</p>
            </div>
          )
          break
        case 2:
          setUserData(prev => ({ ...prev, height: value.height, weight: value.weight }))
          addBotMessage(
            <div>
              <p>ありがとうございます！</p>
              <p className="mt-2">性別を選択してください。</p>
            </div>
          )
          break
        // 他のステップも同様に実装
      }
      setCurrentStep(prev => prev + 1)
    }, 500)
  }

  // スクロール処理
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // チャットメッセージコンポーネント
  const ChatBubble = ({ message }: { message: ChatMessage }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`
        max-w-[80%] rounded-xl p-4
        ${message.type === 'bot' 
          ? 'bg-primary-light text-white' 
          : 'bg-background-light text-gray-800'}
      `}>
        {typeof message.content === 'string' 
          ? <div dangerouslySetInnerHTML={{ __html: message.content }} />
          : message.content
        }
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-background-light">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* チャットメッセージ表示エリア */}
          <div className="h-[70vh] overflow-y-auto">
            {messages.map(message => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="mt-4 border-t pt-4">
            <InputForm step={currentStep} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}
