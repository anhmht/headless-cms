window.fbAsyncInit = function () {
  FB.init({
    appId: '123544734074823',
    xfbml: true,
    version: 'v17.0',
    autoLogAppEvents: true
  })
}
;(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/vn_VN/sdk/xfbml.customerchat.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
