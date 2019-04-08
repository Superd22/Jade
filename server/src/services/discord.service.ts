import { Service } from "typedi";
import { JadeConfig } from "../../config/jade.config";
import { DiscordToken } from "../controllers/discord.controller";
import { default as axios } from "axios";
import { DiscordUser } from "../interfaces/discord/user.interface";
const querystring = require('querystring');


@Service()
export class DiscordService {

    public async getToken(code: string): Promise<DiscordToken | null> {
        const querystring = require('querystring');

        const discordData = {
            'client_id': JadeConfig.discord.clientId,
            'client_secret': JadeConfig.discord.clientSecret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': `http://localhost:4200/authenticate/discord`,
            'scope': 'identify email'
        }

        const discordToken = await axios.post<DiscordToken>(
            `https://discordapp.com/api/v6/oauth2/token`,
            querystring.stringify(discordData)
        )

        return discordToken.data;

    }

    public async getCurrentUser(token: string) {
        const userData = await axios.get<DiscordUser>(`https://discordapp.com/api/v6/users/@me`, { headers: { "Authorization": `Bearer ${token}` } });
        return userData.data;
    }
}