var CHATBUILDER_TEST_DATA = {   
    "actors": [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Emily"
        }
    ],    
    "dialogues": [
                {
                    "id": 1,
                    "parent":null,
                    "isChoice": false,
                    "codeBefore": "this.onlyOnce = true",
                    "codeAfter": "this.onlyOnce = false",
                    "conditionsString": "this.onlyOnce == true",
                    "actor": 1,
                    "conversant": 2,
                    "menuText": "",
                    "dialogueText": "Excuse me, do you know something about cave outside the village?",
                    "outgoingLinks": [
                        2
                    ]
                },
                {
                    "id": 2,
                    "parent":1,
                    "isChoice": false,
                    "codeBefore": "this.onlyOnce = true",
                    "codeAfter": "this.onlyOnce = false",
                    "conditionsString": "this.onlyOnce == true",
                    "actor": 2,
                    "conversant": 1,
                    "menuText": "",
                    "dialogueText": "People is losing there.",
                    "outgoingLinks": [
                        3
                    ]
                },
                {
                    "id": 3,
                    "parent":2,
                    "isChoice": true,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "outgoingLinks": [
                        4,
                        5,
                        6
                    ]
                },
                {
                    "id": 4,
                    "parent":3,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "actor": 1,
                    "conversant": 2,
                    "menuText": "Ask about mayor.",
                    "dialogueText": "Where can I find the mayor.",
                    "outgoingLinks": [
                        41
                    ]
                },
                {
                    "id": 41,
                    "parent":4,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "actor": 2,
                    "conversant": 1,
                    "menuText": "",
                    "dialogueText": "The mayour is in the inn.",
                    "outgoingLinks": [
                        3
                    ]
                },
                {
                    "id": 5,
                    "parent":3,
                    "isChoice": false,
                    "codeBefore": "this.onlyOnce = true",
                    "codeAfter": "this.onlyOnce = false",
                    "conditionsString": "this.onlyOnce == true",
                    "actor": 1,
                    "conversant": 2,
                    "menuText": "Ask about path.",
                    "dialogueText": "How to get there?",
                    "outgoingLinks": [
                        51
                    ]
                },
                {
                    "id": 51,
                    "parent":5,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "actor": 2,
                    "conversant": 1,
                    "menuText": "",
                    "dialogueText": "Folow the river.",
                    "outgoingLinks": [
                        52
                    ]
                },
                {
                    "id": 52,
                    "parent":51,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "actor": 1,
                    "conversant": 2,
                    "menuText": "",
                    "dialogueText": "How much time does it take path.",
                    "outgoingLinks": [
                        53
                    ]
                },
                {
                    "id": 53,
                    "parent":52,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "player.education += 10",
                    "conditionsString": "",
                    "actor": 2,
                    "conversant": 1,
                    "menuText": "",
                    "dialogueText": "About 1 hour.",
                    "outgoingLinks": [
                        3
                    ]
                },
                {
                    "id": 6,
                    "parent":3,
                    "isChoice": false,
                    "codeBefore": "",
                    "codeAfter": "",
                    "conditionsString": "",
                    "actor": 1,
                    "conversant": 2,
                    "menuText": "Leave",
                    "dialogueText": "Good bye",
                    "outgoingLinks": []
                }
            ]     
};

var CHATBUILDER_GOOGLE_CHART_TEST_DATA = [
 [
   {
     "f": "#1 Dialogue<br>Actor: John<br><b></b><br><p>Excuse me, do you know something about cave outside the village?</p><br>Link: (2), C, B, A",
     "v": "1"
   },
   ""
 ],
 [
   {
     "f": "#2 Dialogue<br>Actor: Emily<br><b></b><br><p>People is losing there.</p><br>Link: (3), C, B, A",
     "v": "2"
   },
   "1"
 ],
 [
   {
     "f": "#3 Choice<br>Link: (4,5,6)",
     "v": "3"
   },
   "2"
 ],
 [
   {
     "f": "#4 Dialogue<br>Actor: John<br><b>Ask about mayor.</b><br><p>Where can I find the mayor.</p><br>Link: (41)",
     "v": "4"
   },
   "3"
 ],
 [
   {
     "f": "#41 Dialogue<br>Actor: Emily<br><b></b><br><p>The mayour is in the inn.</p><br>Link: (3)",
     "v": "41"
   },
   "4"
 ],
 [
   {
     "f": "#5 Dialogue<br>Actor: John<br><b>Ask about path.</b><br><p>How to get there?</p><br>Link: (51), C, B, A",
     "v": "5"
   },
   "3"
 ],
 [
   {
     "f": "#51 Dialogue<br>Actor: Emily<br><b></b><br><p>Folow the river.</p><br>Link: (52)",
     "v": "51"
   },
   "5"
 ],
 [
   {
     "f": "#52 Dialogue<br>Actor: John<br><b></b><br><p>How much time does it take path.</p><br>Link: (53)",
     "v": "52"
   },
   "51"
 ],
 [
   {
     "f": "#53 Dialogue<br>Actor: Emily<br><b></b><br><p>About 1 hour.</p><br>Link: (3), A",
     "v": "53"
   },
   "52"
 ],
 [
   {
     "f": "#6 Dialogue<br>Actor: John<br><b>Leave</b><br><p>Good bye</p><br>",
     "v": "6"
   },
   "3"
     ]
   ];  
