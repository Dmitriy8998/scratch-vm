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

    // TODO: refactor this!!!
    fulfillment_wait (args, util) {
        if (args.CONDITION === true || args.CONDITION === false) {
            if (args.CONDITION === false) {
                util.yieldTick();
            }
            if (args.CONDITION === true) {
                this.runtime.glowBlock(null, false);
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
        if (args.CONDITION === '...') {
            this.runtime.glowBlock(null, false);
        }
    };
};

module.exports = RobotConditionsBlocks;
