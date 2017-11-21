/* exported Script */
/* globals console, _, s */
class Script {
    process_incoming_request({ request }) {
        return {
            content:{
                text: request.content.check_result.result_description
            }
        };
    }
}