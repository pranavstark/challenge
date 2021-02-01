<h3 align="center">API Server Challenge</h3>

<p align="center">
  Basic Node.JS app with single route & jest test cases.
</p>


## Running application endpoint
### https://challenge-x.herokuapp.com

## Prerequisite
- Node.JS: `v14.15.4`
- Npm: `v6.14.10`
- MongoDB database

## Quick start

- Clone the repo: `https://github.com/pranavstark/challenge.git`
- Go to the challenge folder `cd challenge`
- Install [Node.JS & NPM](https://nodejs.org/en/download/): `npm install`
- Edit `env.example.template` add details like `PORT`, `DATABASE_URI` etc. as instructed
- Start application using `npm start` or `npm run dev` for development environment
- Open http://localhost:4000/ping in your browser, if msg is `Success` then application is running successfully.

## Running test cases
1. Install `node_modules` by running `npm install`
2. Run `npm run test` or `npm test` for automated api testing.

## Sample API Response
- API endpoint: https://challenge-x.herokuapp.com/api/v1/records
- HTTP Method: `POST`
- Sample request
``` json 
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 0,
    "maxCount": 10
}
```
- Sample Response
``` json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "XVSJAafS",
            "createdAt": "2016-10-06T09:03:06.664Z",
            "totalCount": 7
        },
        {
            "key": "HFrLrkmu",
            "createdAt": "2016-06-13T14:21:11.684Z",
            "totalCount": 4
        },
        {
            "key": "nksTNdZi",
            "createdAt": "2016-05-04T05:15:21.742Z",
            "totalCount": 7
        }
    ]
}
```



## Copyright and license


#### ISC License

#### Copyright (c) 2021, pranavstark

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

`
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`