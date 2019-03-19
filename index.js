const opn = require('opn');
const qs = require('qs');
const axios = require('axios');
const GOOGLE_CLIENT_ID = '';
const GOOGLE_REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
let accessToken = "";

module.exports.Initialize = (iridium) => {
    iridium.Messenger.on('SetAuthorizationCode', (arg) => {
        exchangeToken(arg.token).then(resp => {
            iridium.Settings.SetSettings({
                tokens: {
                    access: resp.data.access_token,
                }
            });
            accessToken = resp.data.access_token;
        });
    });
    iridium.Settings.GetSettings().then((settings) => {
        if (!settings || !settings.tokens) {
            openOAuthScreen();
        } else {
            accessToken = settings.tokens.access;
        }
    });
    iridium.TaskLists.on(iridium.TaskEvents.TaskDueDateChanged, (task) => {
        if (task.dueDate) {
            axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                end: {
                    date: task.dueDate
                },
                start: {
                    date: task.dueDate
                },
                summary: task.title,
            }, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }
    });
}

function exchangeToken(authCode) {
    const GOOGLE_TOKEN_EXCHANGE_URL = 'https://www.googleapis.com/oauth2/v4/token';
    return axios.post(GOOGLE_TOKEN_EXCHANGE_URL, {}, {
        params: {
            code: authCode,
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code"
        }
    });
}

function openOAuthScreen() {
    const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const urlParams = {
        response_type: 'code',
        redirect_uri: GOOGLE_REDIRECT_URI,
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
    }
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`
    opn(authUrl);
}