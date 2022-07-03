import React, { useState, useCallback } from 'react'
import { Modal, Input, Button } from 'antd'
import { registerPost } from '@/api/request'
import s from './index.module.scss'

interface dataProps {
  name: string
  email: string
  confirmEmail: string
}
type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const useRegister = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({} as dataProps)
  const [error, setError] = useState('')
  const open = useCallback(() => {
    setVisible(true)
  }, [])
  const send = useCallback(async () => {
    setLoading(true)
    try {
      const { name, email, confirmEmail } = data
      if (!name) throw 'please check your name'
      if (!regEmail.test(email)) throw 'please check your email'
      if (!regEmail.test(confirmEmail)) throw 'please check confirm email'
      if (email !== confirmEmail)
        throw 'please make sure emial is same as confirmEmail'
      const res = await registerPost({
        name,
        email,
      })
      if (res === 'Registered') {
        cancel()
        Modal.info({
          icon: null,
          content: (
            <div>
              <p>All done!</p>
              <Button>ok</Button>
            </div>
          ),
        })
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [data])
  const cancel = useCallback(() => {
    setVisible(false)
    setError('')
    setData({} as dataProps)
  }, [])
  const changeData = (e: inputEvent, key: string) => {
    setError('')
    const value = {}
    value[key] = e.target.value
    setData({ ...data, ...value })
  }
  const { name, email, confirmEmail } = data
  const modal = (
    <Modal
      width={400}
      title={null}
      visible={visible}
      footer={null}
      onCancel={cancel}
    >
      <div className={s.content}>
        <h3>Request an invite</h3>
        <Input
          value={name}
          onChange={(e: inputEvent) => changeData(e, 'name')}
          className={s.input}
          placeholder='Full name'
        />
        <Input
          value={email}
          onChange={(e: inputEvent) => changeData(e, 'email')}
          className={s.input}
          placeholder='Email'
        />
        <Input
          value={confirmEmail}
          onChange={(e: inputEvent) => changeData(e, 'confirmEmail')}
          className={s.input}
          placeholder='Confirm Email'
        />
        <Button
          loading={loading}
          type='primary'
          className={s.button}
          onClick={send}
        >
          Send
        </Button>
        <p className={s.error}>{error}</p>
      </div>
    </Modal>
  )
  return [modal, open] as const
}

export default useRegister