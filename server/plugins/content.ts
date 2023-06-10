
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._id.endsWith('.md')) {
      file._full = file.body
      const arr = file._path.split('/')
      file._slug = arr[arr.length - 1]
    }
  })
})
