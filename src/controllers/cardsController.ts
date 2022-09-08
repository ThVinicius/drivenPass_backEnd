import { Request, Response } from 'express'
import cardsService from '../services/cardsService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  const credential = await cardsService.create(session.id, req.body)

  return res.status(201).send(credential)
}

async function getByUserId(_: Request, res: Response) {
  const session: users = res.locals.session

  const credentials = await cardsService.getByUserId(session.id)

  return res.status(200).send(credentials)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  const credencial = await cardsService.getById(id, session.id)

  return res.status(200).send(credencial)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  await cardsService.hanleRemove(id, session.id)

  await cardsService.removeCredential(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, getById, remove }
