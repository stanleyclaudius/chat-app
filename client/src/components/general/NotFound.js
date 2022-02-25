const NotFound = () => {
  return (
    <div className='flex items-center justify-center flex-col w-full h-screen'>
      <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' />
      <h1 className='font-medium text-3xl mt-5'>Inspace | 404 Not Found</h1>
    </div>
  )
}

export default NotFound