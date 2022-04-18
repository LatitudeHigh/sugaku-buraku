const TETRIMINO = [{
        size: 3,
        rotation: [{
                shape: [
                    0, 1, 1,
                    0, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }]
            },
            {
                shape: [
                    0, 1, 1,
                    0, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }]
            },
            {
                shape: [
                    0, 1, 1,
                    0, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }]
            },
            {
                shape: [
                    0, 1, 1,
                    0, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }]
            }
        ],
        color: [255, 255, 0]
    },
    {
        size: 4,
        rotation: [{
                shape: [
                    0, 0, 0, 0,
                    1, 1, 1, 1,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -2,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: -2,
                    y: +1
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: +2,
                    y: 0
                }, {
                    x: -1,
                    y: -2
                }, {
                    x: +2,
                    y: +1
                }]
            },
            {
                shape: [
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: +2,
                    y: 0
                }, {
                    x: -1,
                    y: -2
                }, {
                    x: +2,
                    y: +1
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +2,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -2,
                    y: +1
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    1, 1, 1, 1,
                    0, 0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +2,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: +2,
                    y: -1
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: -2,
                    y: 0
                }, {
                    x: +1,
                    y: +2
                }, {
                    x: -2,
                    y: +1
                }]
            },
            {
                shape: [
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: -2,
                    y: 0
                }, {
                    x: +1,
                    y: +2
                }, {
                    x: -2,
                    y: -1
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -2,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: -2,
                    y: +1
                }, {
                    x: +1,
                    y: -2
                }]
            }
        ],
        color: [63, 195, 255]
    },

    {
        size: 3,
        rotation: [{
                shape: [
                    0, 1, 0,
                    1, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: -1
                }, {
                    x: +1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    0, 1, 1,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }]
            },
            {
                shape: [0, 0, 0,
                    1, 1, 1,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    1, 1, 0,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }]
            }
        ],
        color: [255, 0, 255]
    },

    {
        size: 3,
        rotation: [{
                shape: [
                    0, 0, 1,
                    1, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 1
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }]
            },
            {
                shape: [
                    0, 0, 0,
                    1, 1, 1,
                    1, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    1, 1, 0,
                    0, 1, 0,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }]
            }
        ],
        color: [255, 165, 0]
    },

    {
        size: 3,
        rotation: [{
                shape: [
                    1, 0, 0,
                    1, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 1,
                    0, 1, 0,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }]
            },
            {
                shape: [
                    0, 0, 0,
                    1, 1, 1,
                    0, 0, 1
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    0, 1, 0,
                    1, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }]
            }
        ],
        color: [0, 0, 255]
    },
    {
        size: 3,
        rotation: [{
                shape: [
                    0, 1, 1,
                    1, 1, 0,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    0, 1, 1,
                    0, 0, 1
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }]
            },
            {
                shape: [
                    0, 0, 0,
                    0, 1, 1,
                    1, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    1, 0, 0,
                    1, 1, 0,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            }
        ],
        color: [0, 255, 0]
    },
    {
        size: 3,
        rotation: [{
                shape: [
                    1, 1, 0,
                    0, 1, 1,
                    0, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: -1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 0, 1,
                    0, 1, 1,
                    0, 1, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: +1,
                    y: +1
                }, {
                    x: +0,
                    y: -2
                }, {
                    x: +1,
                    y: -2
                }]
            },
            {
                shape: [
                    0, 0, 0,
                    1, 1, 0,
                    0, 1, 1
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: +1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: +1,
                    y: +2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: +2
                }]
            },
            {
                shape: [
                    0, 1, 0,
                    1, 1, 0,
                    1, 0, 0
                ],
                clockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }],
                anticlockwise_centres: [{
                    x: 0,
                    y: 0
                }, {
                    x: -1,
                    y: 0
                }, {
                    x: -1,
                    y: +1
                }, {
                    x: 0,
                    y: +2
                }, {
                    x: -1,
                    y: -2
                }]
            }
        ],
        color: [255, 0, 0]
    },
    {
        color: [255, 255, 255]
    } // create a dummy entry for filling the grid with white blocks for the game over animation
];