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

  rest.get(('/api/approval/details/:id'), (req, res, ctx) => {
    const approvalId = req.params.id
    const approvalDetails = db.approvalRequests.find(approval => (approval._id.includes(approvalId)))
  
    return res(ctx.status(200), ctx.json({ approvalDetails }))
  }),
  
]
