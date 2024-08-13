import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tvShowsCtrl from '../controllers/tvShows.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/


export { router }