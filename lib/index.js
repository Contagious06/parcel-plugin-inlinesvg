const { getOptions } = require('./config')

async function Init (bundler) {
  const { exts } = await getOptions()

  exts.forEach(ext => {
    bundler.addAssetType(ext, require.resolve('./asset.js'))
  })
}

module.exports = Init