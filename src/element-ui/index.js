import Vue from 'vue'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
// 按需引入
import { Button, Row, Col, Menu, Submenu, MenuItem } from 'element-ui'

// 按需加载
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

// 挂载方法
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;
