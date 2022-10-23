import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
  };

export default function () {
    const result = http.get('http://web:8889/');
    check(result, {
        'http response status code is 200': result.status === 200,
    });
  sleep(1);

}