import axios from 'axios'

export function useFetch<P> (url: string): Promise<P> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get'
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(new Error(res.statusText))
        }
      })
      .catch(err => {
        reject(new Error(err.message))
      })
  })
}
