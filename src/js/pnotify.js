import { alert, notice, info, success, error } from '@pnotify/core';
function pnotifyInfo() {
  info({
    text: 'Too many matches found. Please enter a more specific query',
    styling: 'brighttheme',
    delay: 2000,
  });
}

function pnotifyError() {
  error({
    text: 'Not detected',
    styling: 'brighttheme',
    delay: 500,
  });
}

function pnotifyNotice() {
  notice({
    text: 'Error: enter more correctly',
    styling: 'brighttheme',
    delay: 2000,
  });
}

export { pnotifyInfo, pnotifyError, pnotifyNotice };
