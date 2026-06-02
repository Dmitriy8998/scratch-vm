const { name } = require('file-loader');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');


class RobotMovementBlocks {

    static get EXTENSION_ID () {
        return 'Move';
    };

    constructor (runtime) {
        this.runtime = runtime;
    };

    getInfo () {
        return {
            id: RobotMovementBlocks.EXTENSION_ID,
            name: 'Move',
            blocks: [
                {
                    opcode: 'forward',
                    blockType:  BlockType.COMMAND,
                    text: 'Robot_block [METERS]',
                    arguments: {
                        METERS: {
                            type: ArgumentType.STRING,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'backward',
                    blockType:  BlockType.BOOLEAN,
                    text: 'Robot_block [METERS]',
                    arguments: {
                        METERS: {
                            type: ArgumentType.STRING,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'degrees_left_90',
                    blockType:  BlockType.BOOLEAN,
                    text: 'Robot_block [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Rotate left 90 degrees!'
                        }
                    }
                },
                {
                    opcode: 'degrees_right_90',
                    blockType:  BlockType.REPORTER,
                    text: 'Robot_block [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Rotate right 90 degrees!'
                        }
                    }
                },
                {
                    opcode: 'given_angle',
                    blockType:  BlockType.COMMAND,
                    text: 'Robot_block [ANGLE]',
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ]
        };
    };

    forward (args) {
        return new Promise((resolve) => {
            this.runtime.emit('ROBOT_FORWARD', {
                msg: `Result: ${args.METERS}`,
                meters: args.METERS,
                time: Date.now(),
                done: resolve
            });
        });
    }

    backward (args) {
        return new Promise((resolve) => {
            this.runtime.emit('ROBOT_BACKWARD', {
                msg: `Result: ${args.METERS}`,
                meters: args.METERS,
                time: Date.now(),
                done: resolve
            });
        });
    };

    degrees_left_90 (args) {
        return new Promise((resolve) => {
            this.runtime.emit('ROBOT_ROTATE_LEFT_90', {
                msg: `Result: ${args.TEXT}`,
                time: Date.now(),
                done: resolve
            });
        });
    };

    degrees_right_90 (args) {
        return new Promise((resolve) => {
            this.runtime.emit('ROBOT_ROTATE_RIGHT_90', {
                msg: `Result: ${args.TEXT}`,
                time: Date.now(),
                done: resolve
            });
        });
    };

    given_angle (args) {
        return new Promise((resolve) => {
            this.runtime.emit('ROBOT_ROTATE_GIVEN_ANGLE', {
                msg: `Result: ${args.ANGLE}`,
                angle: args.ANGLE,
                time: Date.now(),
                done: resolve
            });
        });
    };
};

module.exports = RobotMovementBlocks;
