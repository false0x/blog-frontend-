import { FC } from "react"
import { ToastContainer } from "react-toastify"

const Toastify: FC = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      style={{ zIndex: 10000 }}
    />
  )
}

export default Toastify