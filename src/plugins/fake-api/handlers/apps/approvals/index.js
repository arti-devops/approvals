import { db } from '@db/apps/approvals/db'
import { rest } from 'msw'

export const handlerApprovalRequests = [
  rest.get(('/api/apps/approvalrequests'), (req, res, ctx) => {
    let approvalRequests = db.approvalRequests.filter(request => (request.status.toLowerCase().includes("pending")))
    
    return res(ctx.status(200), ctx.json({ approvalRequests }))
  }),

  rest.get(('/api/apps/approvalhistory'), (req, res, ctx) => {
    let approvalRequests = db.approvalRequests//.filter(request => (request.status.toLowerCase().includes("pending")))
    
    return res(ctx.status(200), ctx.json({ approvalRequests }))
  }),
]
