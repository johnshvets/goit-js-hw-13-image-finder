import { error } from '@pnotify/core';

export default str => {
  error({
    text: str,
    delay: 1500,
    width: '400px',
  });
};
