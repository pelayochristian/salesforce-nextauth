import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import jsforce from "jsforce"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const conn = await getSFDCConnection(req, res, authOptions);
    if (!conn) {
        res.status(410).json({ message: 'Unauthorized' });
        return;
    }
    //@ts-ignored
    var records: Array = [];
    return new Promise(resolve => {
        //@ts-ignored
        conn.query(
            'SELECT Id, Name ' +
            'FROM Account'
        )
            .on('record', function (record: any) {
                records.push({
                    Name: record.Name,
                    Id: record.Id,
                });
            })
            .on('end', function () {
                res.status(200).json(records);
                return resolve;
            })
            .on('error', function (err: any) {
                console.error(err);
            })
            .run({ autoFetch: true, maxFetch: 4000 });
    })

}

export const getSFDCConnection = async (req: NextApiRequest, res: NextApiResponse, authOptions: any) => {
    try {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
            return await new jsforce.Connection({
                // @ts-ignored
                instanceUrl: session.instanceUrl,
                // @ts-ignored
                accessToken: session.accessToken,
            });
        } else {
            // Not Signed in
            res.status(401)
        }
    } catch (error) {
        return { error: 'SFDCConnectionError' }
    }
} 
