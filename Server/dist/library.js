"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.readMessages=exports.addMessage=void 0;const prisma_1=__importDefault(require("./prisma"));async function addMessage(e){let a=[];try{await prisma_1.default.message.create({data:{gid:e.gid,uid:e.uid,time:e.time,text:e.text}}),a=await prisma_1.default.message.findMany({where:{gid:e.gid}})}catch(t){console.log(t)}finally{await prisma_1.default.$disconnect()}return a}async function readMessages(e){let a=[];try{a=await prisma_1.default.message.findMany({where:{gid:e}})}catch(t){console.log(t)}finally{await prisma_1.default.$disconnect()}return a}exports.addMessage=addMessage,exports.readMessages=readMessages;