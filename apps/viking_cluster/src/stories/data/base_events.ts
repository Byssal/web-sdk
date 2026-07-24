export default {
  "reveal": {
    "index": 0,
    "type": "reveal",
    "board": [
      [
        {
          "name": "W",
          "wild": true
        },
        {
          "name": "L3"
        },
        {
          "name": "L4"
        },
        {
          "name": "L1"
        },
        {
          "name": "L2"
        },
        {
          "name": "W",
          "wild": true
        },
        {
          "name": "L4"
        },
        {
          "name": "L3"
        }
      ],
      [
        {
          "name": "L2"
        },
        {
          "name": "H2"
        },
        {
          "name": "L3"
        },
        {
          "name": "L2"
        },
        {
          "name": "L3"
        },
        {
          "name": "L4"
        },
        {
          "name": "L2"
        },
        {
          "name": "L2"
        }
      ],
      [
        {
          "name": "H4"
        },
        {
          "name": "L3"
        },
        {
          "name": "L3"
        },
        {
          "name": "L4"
        },
        {
          "name": "H4"
        },
        {
          "name": "H3"
        },
        {
          "name": "L1"
        },
        {
          "name": "L1"
        }
      ],
      [
        {
          "name": "L4"
        },
        {
          "name": "L2"
        },
        {
          "name": "L1"
        },
        {
          "name": "L3"
        },
        {
          "name": "L3"
        },
        {
          "name": "L1"
        },
        {
          "name": "W",
          "wild": true
        },
        {
          "name": "H4"
        }
      ],
      [
        {
          "name": "L2"
        },
        {
          "name": "L3"
        },
        {
          "name": "L3"
        },
        {
          "name": "H2"
        },
        {
          "name": "L1"
        },
        {
          "name": "L4"
        },
        {
          "name": "H3"
        },
        {
          "name": "L3"
        }
      ]
    ],
    "paddingPositions": [
      216,
      205,
      195,
      16,
      65
    ],
    "gameType": "basegame",
    "anticipation": [
      0,
      0,
      0,
      0,
      0
    ]
  },
  "setTotalWin": {
    "index": 1,
    "type": "setTotalWin",
    "amount": 0
  },
  "finalWin": {
    "index": 2,
    "type": "finalWin",
    "amount": 0
  },
  "winInfo": {
    "index": 1,
    "type": "winInfo",
    "totalWin": 70,
    "wins": [
      {
        "symbol": "L1",
        "clusterSize": 5,
        "win": 70,
        "positions": [
          {
            "reel": 1,
            "row": 6
          },
          {
            "reel": 2,
            "row": 6
          },
          {
            "reel": 3,
            "row": 6
          },
          {
            "reel": 4,
            "row": 6
          },
          {
            "reel": 2,
            "row": 5
          }
        ],
        "meta": {
          "globalMult": 1,
          "clusterMult": 1,
          "winWithoutMult": 70,
          "overlay": {
            "reel": 2,
            "row": 6
          }
        }
      }
    ]
  },
  "updateTumbleWin": {
    "index": 2,
    "type": "updateTumbleWin",
    "amount": 70
  },
  "updateGrid": {
    "index": 3,
    "type": "updateGrid",
    "gridMultipliers": [
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1
      ]
    ]
  },
  "tumbleBoard": {
    "index": 4,
    "type": "tumbleBoard",
    "newSymbols": [
      [],
      [
        {
          "name": "L2"
        }
      ],
      [
        {
          "name": "L2"
        },
        {
          "name": "L1"
        }
      ],
      [
        {
          "name": "L3"
        }
      ],
      [
        {
          "name": "L3"
        }
      ]
    ],
    "explodingSymbols": [
      {
        "reel": 1,
        "row": 6
      },
      {
        "reel": 2,
        "row": 6
      },
      {
        "reel": 2,
        "row": 5
      },
      {
        "reel": 3,
        "row": 6
      },
      {
        "reel": 4,
        "row": 6
      }
    ]
  },
  "setWin": {
    "index": 5,
    "type": "setWin",
    "amount": 70,
    "winLevel": 2
  },
  "freeSpinTrigger": {
    "index": 2,
    "type": "freeSpinTrigger",
    "totalFs": 10,
    "positions": [
      {
        "reel": 0,
        "row": 3
      },
      {
        "reel": 2,
        "row": 3
      },
      {
        "reel": 3,
        "row": 1
      },
      {
        "reel": 4,
        "row": 3
      }
    ]
  },
  "updateFreeSpin": {
    "index": 4,
    "type": "updateFreeSpin",
    "amount": 1,
    "total": 10
  },
  "freeSpinEnd": {
    "index": 63,
    "type": "freeSpinEnd",
    "amount": 6490,
    "winLevel": 6
  },
  "freeSpinRetrigger": {
    "index": 17,
    "type": "freeSpinRetrigger",
    "totalFs": 13,
    "positions": [
      {
        "reel": 2,
        "row": 2
      },
      {
        "reel": 3,
        "row": 6
      },
      {
        "reel": 4,
        "row": 2
      }
    ]
  },
  "updateGlobalMult": {
    "index": 0,
    "type": "updateGlobalMult",
    "globalMult": 2
  }
} as any;
