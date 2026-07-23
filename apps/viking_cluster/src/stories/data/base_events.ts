export default {
  "reveal": {
    "index": 0,
    "type": "reveal",
    "board": [
      [
        {
          "name": "S",
          "scatter": true
        },
        {
          "name": "L3"
        },
        {
          "name": "H1"
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
        }
      ],
      [
        {
          "name": "L2"
        },
        {
          "name": "L4"
        },
        {
          "name": "H2"
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
          "name": "L1"
        }
      ],
      [
        {
          "name": "H2"
        },
        {
          "name": "L4"
        },
        {
          "name": "L4"
        },
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
          "name": "L4"
        },
        {
          "name": "L1"
        },
        {
          "name": "W",
          "wild": true
        },
        {
          "name": "L4"
        },
        {
          "name": "L2"
        }
      ],
      [
        {
          "name": "L1"
        },
        {
          "name": "L2"
        },
        {
          "name": "L4"
        },
        {
          "name": "L3"
        },
        {
          "name": "L2"
        },
        {
          "name": "S",
          "scatter": true
        },
        {
          "name": "L3"
        }
      ],
      [
        {
          "name": "L4"
        },
        {
          "name": "L1"
        },
        {
          "name": "L1"
        },
        {
          "name": "L4"
        },
        {
          "name": "L2"
        },
        {
          "name": "H1"
        },
        {
          "name": "L4"
        }
      ]
    ],
    "paddingPositions": [
      216,
      205,
      195,
      16,
      65,
      30
    ],
    "gameType": "basegame",
    "anticipation": [
      0,
      0,
      0,
      0,
      0,
      0
    ]
  },
  "updateGrid": {
    "index": 1,
    "type": "updateGrid",
    "gridMultipliers": [
      [
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
        0
      ],
      [
        0,
        2,
        0,
        0,
        0
      ],
      [
        0,
        2,
        0,
        0,
        0
      ],
      [
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
        0
      ]
    ]
  },
  "winInfo": {
    "index": 2,
    "type": "winInfo",
    "totalWin": 140,
    "wins": [
      {
        "symbol": "L4",
        "clusterSize": 5,
        "win": 140,
        "positions": [
          {
            "reel": 1,
            "row": 1
          },
          {
            "reel": 2,
            "row": 1
          },
          {
            "reel": 2,
            "row": 2
          },
          {
            "reel": 3,
            "row": 2
          },
          {
            "reel": 4,
            "row": 2
          }
        ],
        "meta": {
          "globalMult": 1,
          "clusterMult": 7,
          "winWithoutMult": 20,
          "overlay": {
            "reel": 2,
            "row": 2
          }
        }
      }
    ]
  },
  "updateTumbleWin": {
    "index": 3,
    "type": "updateTumbleWin",
    "amount": 140
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
          "name": "L4"
        },
        {
          "name": "H4"
        }
      ],
      [
        {
          "name": "L3"
        }
      ],
      [
        {
          "name": "L4"
        }
      ],
      []
    ],
    "explodingSymbols": [
      {
        "reel": 1,
        "row": 1
      },
      {
        "reel": 2,
        "row": 1
      },
      {
        "reel": 2,
        "row": 2
      },
      {
        "reel": 3,
        "row": 2
      },
      {
        "reel": 4,
        "row": 2
      }
    ]
  },
  "setWin": {
    "index": 5,
    "type": "setWin",
    "amount": 140,
    "winLevel": 3
  },
  "setTotalWin": {
    "index": 6,
    "type": "setTotalWin",
    "amount": 140
  },
  "finalWin": {
    "index": 7,
    "type": "finalWin",
    "amount": 140
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
        "row": 1
      },
      {
        "reel": 3,
        "row": 3
      },
      {
        "reel": 5,
        "row": 4
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
    "amount": 11980,
    "winLevel": 7
  },
  "freeSpinRetrigger": {
    "index": 75,
    "type": "freeSpinRetrigger",
    "totalFs": 20,
    "positions": [
      {
        "reel": 1,
        "row": 2
      },
      {
        "reel": 2,
        "row": 5
      },
      {
        "reel": 3,
        "row": 5
      }
    ]
  },
  "updateGlobalMult": {
    "index": 0,
    "type": "updateGlobalMult",
    "globalMult": 2
  }
} as any;
