const fs = require('fs');
const path = require('path');

const scriptLoader = require('./script-loader');
const Script = scriptLoader(path.join(__dirname, '..', 'graylog-rocketchat.hooks.js'));


const getRequest = (filename) => {
    const src = fs.readFileSync(path.join(__dirname, 'resources', filename), 'utf8');
    let content = JSON.parse(src);
    return {request:{content: content}};
};


test('Handles dummy alert', () => {
    const response = new Script().process_incoming_request(getRequest('dummy-alert.json'));
    expect(response.content.text).toBe('Dummy alert to test notifications');
});

test('Handles error alert', () => {
    const response = new Script().process_incoming_request(getRequest('error-alert.json'));
    const expected = [
        'A global exception on URL http://www.example.com, headers: {Cookie=__cfduid=dd00f87ca1571f030cd86dc107ce0fbee1502342427; language=ro; JSESSIONID=example1rw0aif2vail73dck6kkzx1hk.example1; searches=1; gender=; birthyear=, CF',
        '[Display complete message](https://graylog.example.com/messages/graylog_7/f7bc4d31-cf47-11e7-84b1-0242ac120004)'
    ];
    expect(response.content.text.split('\n')).toEqual(expected);
});

test('Aggregates same messages in error', () => {
    const response = new Script().process_incoming_request(getRequest('multimessage-alert.json'));
    const expected = [
        'java.lang.NullPointerException',
        'URL: http://www.example.com',
        '[Display complete message](https://graylog.example.com/messages/graylog_7/d369a310-d0f5-11e7-84b1-0242ac120004), [#2](https://graylog.example.com/messages/graylog_7/d28117d1-d0f5-11e7-84b1-0242ac120004)'
    ];

    console.log(response.content.text);

    expect(response.content.text.split('\n')).toEqual(expected);
});