import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'meio',
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const { raw, argv, ...args } = parameters
    print.info('Welcome to your meio CLI')
    console.log(args)
  },
}

module.exports = command
