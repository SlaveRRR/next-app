import { Server as NetServer } from 'http';

import { NextApiRequest } from 'next';

import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIO } from '@/types/server';


export const config = {
    api: {
        bodyParser: false
    }

}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io';

        const httpServer: NetServer = res.socket.server as any;

        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false
        })

        res.socket.server.io = io

        io.on('connection', socket => {

            socket.on("article-creation", msg => {

                socket.broadcast.emit('article-created', msg)
            })

            socket.on('comment-creation', msg => {

                socket.broadcast.emit('comment-created', msg)
            })

            
        })
    }

    res.end();
}
//
export default ioHandler;