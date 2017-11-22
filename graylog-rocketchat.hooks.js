/* exported Script */
/* globals console, _, s */

const GRAYLOG_URL = 'https://graylog.example.com';

const createPermalink = (m) => {
    return `[Display complete message](${GRAYLOG_URL}/messages/${m.index}/${m.id})`
};

const formatMessage = (m) => {
return m.message + '\n' + createPermalink(m);
};

const parseText = function (result) {
    if(result.matching_messages.length > 0) {
        return result.matching_messages.map(formatMessage).join("\n\n");
    } else {
        return result.result_description;
    }
};

class Script {
    process_incoming_request({ request }) {
        return {
            content:{
                text: parseText(request.content.check_result)
            }
        };
    }
}