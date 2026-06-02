const { name } = require('file-loader');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');


class RobotConditionsBlocks {

    static get EXTENSION_ID () {
        return 'Conditions';
    };

    constructor (runtime) {
        this.runtime = runtime;
    };

    getInfo () {
        return {
            id: RobotConditionsBlocks.EXTENSION_ID,
            name: 'Conditions',
            blocks: [
                {
                    opcode: 'forever_loop',
                    blockType: BlockType.CONDITIONAL,
                    branchCount: 1,
                    text: 'forever do: [CONDITION]',
                    arguments: {
                        CONDITION: {
                            type: ArgumentType.STRING
                        },
                    }
                },
                {
                    opcode: 'boolean_loop',
                    blockType: BlockType.CONDITIONAL,
                    branchCount: 1,
                    text: 'check then do: [CONDITION]',
                    arguments: {
                        CONDITION: {
                            type: ArgumentType.BOOLEAN
                        },
                    }
                },
                {
                    opcode: 'fulfillment_wait',
                    blockType: BlockType.CONDITIONAL,
                    branchCount: 1,
                    text: 'check then do: [CONDITION]',
                    arguments: {
                        CONDITION: {
                            type: ArgumentType.BOOLEAN
                        },
                    }
                }
            ]
        };
    };

    forever_loop (args, util) {
        util.startBranch(1, true);
        util.yieldTick();        
        this.runtime.emit('FOREVER_LOOP', {
            //
        })
    }

    boolean_loop (args, util) {
        if (args.CONDITION === false) {
            util.startBranch(1, true);
            // util.yieldTick();
        };
    };

    fulfillment_wait (args, util) {
        if (args.CONDITION === true || args.CONDITION === false) {
            if (args.CONDITION === false) {
                util.yieldTick();
            }
        } else {
            const value = Number(args.CONDITION);
            
            if (util.stackTimerNeedsInit()) {
                const duration = Math.max(0, 1000 * Number(value));
                util.startStackTimer(duration);
                this.runtime.requestRedraw();
                util.yield();
            } else if (!util.stackTimerFinished()) {
                util.yield();
            }
        }
    };
};

module.exports = RobotConditionsBlocks;
