const { name } = require('file-loader');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');


class RobotConditionsBlocks {

    static get EXTENSION_ID () {
        return 'Loop';
    };

    constructor (runtime) {
        this.runtime = runtime;
    };

    getInfo () {
        return {
            id: RobotConditionsBlocks.EXTENSION_ID,
            name: 'Loop',
            blocks: [
                {
                    opcode: 'forever',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    text: 'forever loop',
                    arguments: {
                        LOOP: {
                            type: ArgumentType.STRING
                        },
                    }
                },
                {
                    opcode: 'while',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    text: 'check then do: [CONDITION]',
                    arguments: {
                        CONDITION: {
                            type: ArgumentType.BOOLEAN
                        },
                    }
                },
                {
                    opcode: 'count',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    text: 'number of iteration: [COUNT]',
                    arguments: {
                        COUNT: {
                            type: ArgumentType.NUMBER
                        },
                    }
                }
            ]
        };
    };

    forever (args, util) {
        util.startBranch(1, true);
        util.yieldTick();        
        this.runtime.emit('FOREVER_LOOP', {
        })
    }

    while (args, util) {
        console.log('bool_', args.CONDITION)
        if (args.CONDITION === false) {
            util.startBranch(1, true);
            util.yieldTick();
        };
    };

    count (args, util) {
        util.stackFrame.i ??= Number(args.TIMES);
        if (util.stackFrame.i-- > 0) {
            util.startBranch(1, true);
            util.yieldTick();
        }
    };
};

module.exports = RobotConditionsBlocks;
