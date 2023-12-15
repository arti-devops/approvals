import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const axiosLogin = async (username, password) => {
  try {
    // Encode the credentials for Basic Authentication in Node.js
    const base64Credentials = btoa(`${username}:${password}`)
    const authorizationHeader = `Basic ${base64Credentials}`

    // Set up the Axios request configuration
    const config = {
      headers: {
        'Authorization': authorizationHeader,
        'Content-Type': 'application/json',
      },
    }

    // Make a POST request to the /token endpoint
    const response = await axios.post(import.meta.env.VITE_API_LOGIN_URL, {}, config)

    // Decode the token
    const decodedToken = jwtDecode(response.data.access_token)

    // Extract relevant data
    const accessToken = response.data.access_token
    const userAbilityRules = decodedToken["abilities"]

    const userData = {
      username: decodedToken["sub"],
      exp: decodedToken["exp"],
      fullName: decodedToken["fullName"],
      role: decodedToken["role"],
      avatar: decodedToken["avatar"],
    }

    // Return the data
    return { accessToken, userData, userAbilityRules }
  } catch (error) {
    console.error('Error:', error.response)

    // Propagate the error so it can be handled in the calling code
    throw error
  }
}
