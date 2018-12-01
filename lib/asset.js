const { Asset } = require('parcel-bundler');
const svg = require("svgo");
const { getOptions } = require('./config');

class InlineSvgAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }
  async parse(str) {
    const {
      plugins = [
        {
          removeDoctype: true
        },
        {
          removeComments: true
        },
        {
          removeXMLNS: true
        }
      ]
    } = await getOptions();

    const svgo = new svg({
      plugins: plugins
    });

    const optimizedSvg = await svgo.optimize(str);

    this.code = optimizedSvg.data;
  }
  generate() {
    // Send to JS bundler
    return {
      'js': `module.exports = '${this.code.replace("'", "&#39;")}'`
    };
  }
}

module.exports = InlineSvgAsset;