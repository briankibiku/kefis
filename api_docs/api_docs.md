### mSwali API Documentation 
#### 1. Top teams


##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-teams](http://localhost/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-teams) --->  Working

##### Authentication

- Authentication is **REQUIRED** since this is a feature inside the app.

- Type of authentication required is for a user to be logged in

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not

##### Responses

Response 200

```
{
   "status":true,
   "message":"Results for team scores found",
   "data":[
      {
         "team_id":"53",
         "team_name":"T-55",
         "score":"18530"
      }
   ]
}
```

#### 2. Get Top Players 

##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-performers](http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-performers) ---> Working

##### Authentication

- Authentication is **REQUIRED** since this is a feature inside the app.

- Type of authentication required is for a user to be logged in

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not

Responses

Response 200
```
{
   "status":true,
   "message":"Results for members scores found",
   "data":[
      {
         "score":"9950",
         "name":"HocusPocus",
         "phone":"254707689168"
      }
   ]
}
```


#### 3. Your answers

##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724909783](http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724909783) --->  Working

##### Authentication

- Authentication is **REQUIRED** since this is a feature inside the app.

- Type of authentication required is for a user to be logged in

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not
- 
##### Responses

Response 200
```
{
   "message":"Results from your last quiz",
   "has_played":true,
   "quiz_responses":"B,A,B,B,D,C,B,A,C",
   "choices_picked":[
      {
         "picked":"B",
         "timeout":0
      }
      // 8 more records here
   ],
   "resp":[
      {
         "id":"41978",
         "question":"What is the meaning of the word Nairobi?",
         "answer":"Cool waters",
         "label":"D",
         "session_id":"217103"
      }
      // 8 more records here
   ]
}
```


#### 4. Fetch all questions

##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724909783](http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724909783)  ---> Working

##### Authentication

- Authentication is **REQUIRED** since this is a feature inside the app.

- Type of authentication required is for a user to be logged in

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not

##### Responses

Response 200
```
{
   "status":200,
   "status_message":"1 questions found",
   "data":[
      {
         "question":"Who is Kenya's fastest sprinter in the 100m race?",
         "choices":[
            {
               "id":81846,
               "choice":"A",
               "answer_text":"Anderson Mutegi",
               "correct":0,
               "inserted_at":"2021-03-29 10:19:18",
               "question_id":20777
            },
            {
               "id":81847,
               "choice":"B",
               "answer_text":"Ferdinand Omanyala",
               "correct":1,
               "inserted_at":"2021-03-29 10:19:18",
               "question_id":20777
            },
            {
               "id":81848,
               "choice":"C",
               "answer_text":"Maurice Wasike",
               "correct":0,
               "inserted_at":"2021-03-29 10:19:18",
               "question_id":20777
            },
            {
               "id":81849,
               "choice":"D",
               "answer_text":"Mark Odhiambo",
               "correct":0,
               "inserted_at":"2021-03-29 10:19:18",
               "question_id":20777
            }
         ]
      }
   ]
}
```


#### 5. Register new user
##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/register-user&username=TestUser&account_number=0724909783](http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/register-user&username=TestUser&account_number=0724909783)  ---> Working

##### Authentication

- Authentication is **REQUIRED**, they need to have verified their phone number via OTP before they get to this step

- Type of authentication required is OTP

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not

##### Responses

Response 200
```
{
   "status":200,
   "status_message":"saved successfully",
   "format":12
}
```

#### 6. Get user profile

##### POST /a/sample/endpoint

[http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=254707630747](http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=254707630747)  ---> Working

##### Authentication

- Authentication is **REQUIRED** since this is a feature inside the app.

- Type of authentication required is for a user to be logged in

##### Payload

- A table of field names, their types, description and whether they are required or not

##### Headers

- A table of headers, their description and whether required or not

##### Responses

Response 200
```
{
   "status":true,
   "status_message":"user found",
   "settings":{
      "id":1,
      "status":1,
      "fee":100,
      "premium_fee":null,
      "games_limit":4,
      "premium_games_limit":null,
      "max_withdrawal":5000,
      "min_withdrawal":30,
      "referral_credits":5,
      "loyalty_credits":1,
      "quiz_size":9,
      "sessions_limit":30,
      "limit_participation":0,
      "tax":0.15,
      "inserted_at":"2021-06-03 11:12:20"
   },
   "data":{
      "id":145,
      "name":"Kepha",
      "account_number":"254707630747",
      "score":12360,
      "referral_code":"MAS47",
      "can_notify":1,
      "disabled":0,
      "joined_at":"2019-11-18 09:00:13",
      "last_active":"2021-12-08 13:16:28"
   }
}
```

