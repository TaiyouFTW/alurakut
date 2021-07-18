import { SiteClient } from 'datocms-client';

export default async function Community(request, response) {
    const TOKEN = process.env.DATO_TOKEN;
    if (request.method === 'POST') {
        const client = new SiteClient(TOKEN);

        const createdCommunity = await client.items.create({
            itemType: "975373",
            ...request.body,
        })

        return response.json(createdCommunity);
    }
    else if (request.method === 'GET') {
        const client = new SiteClient(TOKEN);

        const community = await client.items.all({
            itemType: "975373",
            ...request.body,
        });

        return response.json(community);
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}