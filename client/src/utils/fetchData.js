import axios from 'axios'

export const getDataAPI = async(url, accessToken) => {
  const res = await axios.get(`/api/v1/${url}`, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const postDataAPI = async(url, data, accessToken) => {
  const res = await axios.post(`/api/v1/${url}`, data, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const patchDataAPI = async(url, data, accessToken) => {
  const res = await axios.patch(`/api/v1/${url}`, data, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const deleteDataAPI = async(url, accessToken) => {
  const res = await axios.delete(`/api/v1/${url}`, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}