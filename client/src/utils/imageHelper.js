export const uploadImage = async(files, type) => {
  const images = []

  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)
    type === 'avatar' ? formData.append('upload_preset', 'uoldibjp') : formData.append('upload_preset', 'qdrd1akc')
    formData.append('cloud_name', 'dpef9sjqt')
    
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dpef9sjqt/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()

      images.push(data.secure_url)
    } catch (err) {
      console.log(err)
    }
  }

  return images
}