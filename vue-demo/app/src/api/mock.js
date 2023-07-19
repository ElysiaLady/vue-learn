import Mock from "mockjs";
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permisson from "./mockServeData/permisson";


//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getstatisticalData)

//用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post',  user.updateUser)
Mock.mock('/api/user/del', 'post',  user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)
Mock.mock(/api\/permission\/getMenu/, 'post', permisson.getMenu)