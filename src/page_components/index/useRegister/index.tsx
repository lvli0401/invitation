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
        const modal = Modal.info({
          icon: null,
          style: { padding: 0 },
          content: (
            <div className={s.success}>
              <h3>All done!</h3>
              <p>
                You will be the first to experience Broccoli &amp; Co. when we
                launch.
              </p>
              <Button
                type='primary'
                className={s.successBtn}
                onClick={() => modal.destroy()}
              >
                ok
              </Button>
            </div>
          ),
          centered: true,
          okButtonProps: { style: { height: 0, display: 'none' } },
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
      data-testid='modal'
      width={400}
      title={null}
      visible={visible}
      footer={null}
      onCancel={cancel}
    >
      <div className={s.content}>
        <h3>Request an invite</h3>
        <Input
          data-testid='name'
          value={name}
          onChange={(e: inputEvent) => changeData(e, 'name')}
          className={s.input}
          placeholder='Full name'
        />
        <Input
          data-testid='email'
          value={email}
          onChange={(e: inputEvent) => changeData(e, 'email')}
          className={s.input}
          placeholder='Email'
        />
        <Input
          data-testid='confirmEmail'
          value={confirmEmail}
          onChange={(e: inputEvent) => changeData(e, 'confirmEmail')}
          className={s.input}
          placeholder='Confirm Email'
        />
        <Button
          data-testid='send'
          type='primary'
          loading={false}
          style={loading ? { color: 'rgba(#fff, 0.7)' } : {}}
          className={s.button}
          onClick={send}
        >
          {loading ? 'Sending, please wait...' : 'Send'}
        </Button>
        <p data-testid='error' className={s.error}>
          {error}
        </p>
      </div>
    </Modal>
  )
  return [modal, open] as const
}

export default useRegister
