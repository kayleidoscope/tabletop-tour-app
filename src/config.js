const isDev = process.env.NODE_ENV !== 'production'

const config = {
    BGA_CLIENT_ID: process.env.REACT_APP_BGA_CLIENT_ID,
    BGA_CLIENT_SECRET: process.env.REACT_APP_BGA_CLIENT_SECRET,
    BGA_BASE_URL: process.env.REACT_APP_BGA_BASE_URL,
    API_ENDPOINT: isDev ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL,
    CURRENT_VERSION: 2,
    API_TOKEN: isDev ? process.env.REACT_APP_DEV_API_TOKEN : process.env.REACT_APP_PROD_API_TOKEN
}

export default config