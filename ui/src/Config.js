const config = {
  development: {
      apiUrl: "http://localhost:3001"
  },
  production: {
      apiUrl: process.env.REACT_APP_API_URL
  }
}

export default config;