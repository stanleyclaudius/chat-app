const Avatar = ({ size }) => {
  return (
    <div className={`${size ? 'w-[40px] h-[40px]' : 'w-16 h-16'} rounded-full shrink-0 bg-white drop-shadow-md`}>
      <img src='' />
    </div>
  )
}

export default Avatar