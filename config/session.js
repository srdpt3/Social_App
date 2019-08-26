/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {
  cookie:{
    _expires:365*24*60*60*1000
  },
  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '1945d12b88588cf09ab32404660d0af4',
  adapter: 'connect-mongo',
  // url:'mongodb://fullstackadmin:yangds777@cluster0-shard-00-00-vxjsh.mongodb.net:27017,cluster0-shard-00-01-vxjsh.mongodb.net:27017,cluster0-shard-00-02-vxjsh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  url: 'mongodb://fullstackadmin:yangds777@ds253537.mlab.com:53537/heroku_dfxj60cb',
  collection: 'sessions',
  auto_reconnect: false,
  ssl: false,
  stringify: true


  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
