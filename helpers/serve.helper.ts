import { resolve } from 'path'
import { Response } from 'express'
import { ModifiedRequest } from '../shared/types'

export default function serveHelper(req: ModifiedRequest, res: Response): void {
  res.sendFile(resolve('client', 'build', 'index.html'))
}
