import React, { useEffect } from 'react'
import s from './index.module.scss'
import { Button, message } from 'antd'
import { registerPost } from '@/api/request'

export default () => {
  const register = async () => {
    const res = await registerPost({
      name: '吕光冬',
      email: 'lvguangdong@qq.com',
    })
    message.info(res)
  }
  useEffect(() => {}, [])
  return (
    <div>
      <div className={s.home}>首页</div>
      <Button type='dashed' onClick={register}>
        测试
      </Button>
    </div>
  )
}
