import { NextApiHandler } from 'next'
import { setAuthCookies } from 'next-firebase-auth'
import initAuth from '../../initAuth' // the module you created above

initAuth()

const handler: NextApiHandler  = async (req, res) => {
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    console.error('login error \n' + e);
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler;