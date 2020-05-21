module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test/test-todo/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/variables.scss"; @import "@/assets/styles/main.scss";`
      }
    }
  }
}