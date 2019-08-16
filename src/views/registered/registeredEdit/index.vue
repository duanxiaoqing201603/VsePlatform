<template>
  <div class="RegisterEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div ><span>用户ID</span>
        <el-input v-model="registerID" placeholder="用户ID"></el-input>
      </div>
      <div><span>用户名</span>
        <el-input v-model="registerName" placeholder="用户名"></el-input>
      </div>
      <div><span>学校名称</span>
        <el-input v-model="university" placeholder="学校名称"></el-input>
      </div>
      <div><span>密码</span>
        <el-input v-model="registerPass" placeholder="密码"></el-input>
      </div>
      <div><span>确认密码</span>
        <el-input v-model="confirmPass" placeholder="确认密码"></el-input>
      </div>
      <div>
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import {Message} from 'element-ui'
  export default {
    name:'RegisteredEdit',
    data(){
      return {
        operate:'',
        pageTitle:'',
        registerName:'',
        university:'',
        registerID:'',
        registerPass:'',
        confirmPass:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.registerID=this.$route.query.registerID;
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.registerID){
        https.fetchPost('http://test.edrmd.com:1443/manage/user/register/find',{'id':this.$route.query.registerID}).then(res=>{
          let data=res.data.data;
          this.registerID=data.id;
          this.university=data.university;
          this.registerName=data.name;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      save(){
        let params={};
        params.name=this.registerName;
        params.university=this.university;
        params.id=this.registerID;
        params.registerPass=this.registerPass;
        if(this.registerID){
          https.fetchPost('http://test.edrmd.com:1443/manage/user/register/update',params).then(res=>{
            if(res.data.status==='0000'){
              Message({
                message: res.data.message
              });
            }else{
              Message({
                message: res.data.message
              });
            }
          }).catch(err=>{
            console.log(err);
          })
        }else{
          https.fetchPost('http://test.edrmd.com:1443/manage/subject/add',params).then(res=>{
            if(res.data.status==='0000'){
              Message({
                message: res.data.message
              });
            }else{
              Message({
                message: res.data.message
              });
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    }
  }
</script>
<style>
  .RegisterEdit{
    margin:20px;
  }
  .RegisterEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .RegisterEdit .title span{
    display: block;
    border-bottom:red;
    text-align: center;
    padding:0 10px;
    width:80px;
    height:37px;
    line-height: 37px;
    background:#fff;
    border-top: solid 1px #d0dee5;
    border-right: solid 1px #d0dee5;
  }
  .RegisterEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .RegisterEdit .collegeContent div{
    display: flex;
    margin-bottom:15px;
  }
  .RegisterEdit .collegeContent span{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .RegisterEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .RegisterEdit .el-button span{
    line-height: 0;
  }
</style>
