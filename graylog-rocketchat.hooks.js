/* exported Script */
/* globals console, _, s */

const parseText = function (result) {
    if(result.matching_messages.length > 0) {
        return result.matching_messages.map(m => m.message).join("\n\n");
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