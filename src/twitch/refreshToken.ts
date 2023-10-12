import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';
import { appTwitchClientId, appTwitchClientSecret } from '../../config.json';

export async function zRefreshTwitch() {
    const clientId = appTwitchClientId;
    const clientSecret = appTwitchClientSecret;

    const tokenData = (async () => {
        JSON.parse(await fs.readFile('./tokens.247367760.json', 'utf-8'));
    });
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret
        }
    );

    authProvider.onRefresh(async (userId, newTokenData) => await fs.writeFile(`./tokens.247367760.json`, JSON.stringify(newTokenData, null, 4), 'utf-8').then( () => {
        //@ts-ignore
        authProvider.addUser('247367760', tokenData);
    }
    ));


}

export async function mRefreshTwitch() {
    const clientId = appTwitchClientId;
    const clientSecret = appTwitchClientSecret;

    const tokenData = (async () => {
        JSON.parse(await fs.readFile('./tokens.89168535.json', 'utf-8'));
    });
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret
        }
    );

    authProvider.onRefresh(async (userId, newTokenData) => await fs.writeFile(`./tokens.89168535.json`, JSON.stringify(newTokenData, null, 4), 'utf-8').then( () => {
        //@ts-ignore
        authProvider.addUser('89168535', tokenData);
    }
    ));
}