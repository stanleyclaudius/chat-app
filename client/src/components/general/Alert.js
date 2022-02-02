import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  const { alert } = useSelector(state => state)

  useEffect(() => {
    if (alert.errors) {
      toast.error(alert.errors)
    } else if (alert.success) {
      toast.success(alert.success)
    }
  }, [alert])

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Alert