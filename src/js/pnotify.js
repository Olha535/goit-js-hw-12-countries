import { alert, notice, info, success, error } from '@pnotify/core';
function pnotifyInfo() {
  info({
    text: 'Too many matches found. Please enter a more specific query',
  });
}

function pnotifyError() {
  error({
    text: 'not detected',
  });
}

export { pnotifyInfo, pnotifyError };
