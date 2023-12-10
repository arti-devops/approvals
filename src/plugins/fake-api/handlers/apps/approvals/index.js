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

  // TO ADAPT
  rest.get(('/api/approval/uploadfile'), (req, res, ctx) => {
    const approvalId = req.params.id

    //const approvalDetails = db.approvalRequests.find(approval => (approval._id.includes(approvalId)))
    const uploadSuccess = {
      "code": 200,
      "message": "File uploaded successfully",
      "filename": "ARTI-LE7-58S-12-2023.png",
      "hash": "c4bd7339ef5bad11a77c3040614dabd50af025cfa034ca85854417a29b0c4451",
      "link": "https://localhost:8000/readfile/ARTI-LE7-58S-12-2023.png",
    }

    const uploadError = {
      "code": 409,
      "message": "File with the same hash already exists",
      "hash": "7f81b109f1379ad5f2882e1bb12d94ee69186513b6a6fec6096ded57c74e6cf3",
    }
  
    return res(ctx.status(200), ctx.json({ response: uploadSuccess }))
  }),
  
]
