<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div v-if="operate==='edit'" class="demo-input-suffix"><span>学院ID</span>
        <el-input v-model="collegeID" placeholder="学院ID"></el-input>
      </div>
      <div><span>学院名称</span>
        <el-input v-model="collegeName" placeholder="学院名称"></el-input>
      </div>
      <div v-if="operate==='edit'" class="demo-input-suffix"><span>创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间"></el-input>
      </div>
      <div  v-if="operate==='edit'"><span>图片URL</span>
        <el-input v-model="imageUrl" placeholder="图片URL"></el-input>
      </div>
      <div  v-if="operate==='new'"><span>图片名称</span>
        <el-input v-model="imageName" placeholder="上传后返回的图片名称"></el-input>
      </div>
      <div><span>是否在首页展现</span>
        <el-input v-model="homeShow" placeholder="是否在首页展现：1、展现"></el-input>
      </div>
      <div><span>排序</span>
        <el-input v-model="sort" placeholder="是否排序"></el-input>
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
    name:'CollegeEdit',
    data(){
      return {
        operate:'',
        pageTitle:'',
        imageName:'',
        collegeName:'',
        homeShow:'',
        sort:'',
        collegeID:'',
        imageUrl:'',
        createTime:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.collegeID){
        https.fetchPost('http://test.edrmd.com:1443/manage/college/find',{'id':this.$route.query.collegeID}).then(res=>{
          let data=res.data.data;
          this.collegeName=data.name;
          this.collegeID=data.id;
          this.imageUrl=data.image;
          this.createTime=data.createTime;
          this.homeShow=data.homeShow;
          this.sort=data.sort;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      save(){
        let params={};
        params.image=this.imageName;
        params.name=this.collegeName;
        params.homeShow=this.homeShow;
        params.sort=this.sort;
        params.id=this.collegeID;
        if(this.collegeID){
          https.fetchPost('http://test.edrmd.com:1443/manage/college/update',params).then(res=>{
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
            https.fetchPost('http://test.edrmd.com:1443/manage/college/add',params).then(res=>{
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
  .CollegeEdit{
    margin:20px;
  }
  .CollegeEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .CollegeEdit .title span{
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
  .CollegeEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .CollegeEdit .collegeContent div{
    display: flex;
    margin-bottom:15px;
  }
  .CollegeEdit .collegeContent span{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .CollegeEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .CollegeEdit .el-button span{
    line-height: 0;
  }
</style>
