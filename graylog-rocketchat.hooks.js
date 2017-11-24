/* exported Script */
/* globals console, _, s */

const GRAYLOG_URL = 'https://graylog.example.com';

const createPermalink = (m, index) => {
    const label = index === 0 ? 'Display complete message' : `#${index + 1}`;
    return `[${label}](${GRAYLOG_URL}/messages/${m.index}/${m.id})`
};

const formatMessages = (messages) => {
    const grouped = messages.reduce((acc, m) => {
            if (!acc.hasOwnProperty(m.message)) {
                acc[m.message] = [];
            }
            acc[m.message].push(m);
            return acc;
        }
        , {});
    const result = [];
    for (let mType in grouped) {
        if (grouped.hasOwnProperty(mType)) {
            const line = mType + '\n' + grouped[mType].map(createPermalink).join(", ");
            result.push(line);
        }
    }
    return result.join('\n-------------\n');
};

const parseText = function (result) {
    if (result.matching_messages.length > 0) {
        return formatMessages(result.matching_messages);
    } else {
        return result.result_description;
    }
};

class Script {
    process_incoming_request({request}) {
        return {
            content: {
                text: parseText(request.content.check_result)
            }
        };
    }
}