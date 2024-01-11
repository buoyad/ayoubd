export const serverConfig = () => {
  const siteURL = process.env.SITE_URL
  if (!siteURL) {
    throw new Error('SITE_URL is not set')
  }

  const testingChat = process.env.TESTING_CHAT === 'true'

  return { siteURL, testingChat }
}
