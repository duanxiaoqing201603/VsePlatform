<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div v-if="operate==='edit'"><span>学科ID</span>
        <el-input v-model="subjectID" placeholder="学科ID"></el-input>
      </div>
      <div><span>学科名称</span>
      <el-input v-model="subjectName" placeholder="学科名称"></el-input>
      </div>
      <div v-if="operate==='edit'"><span>创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间"></el-input>
      </div>
      <div><span>学院ID</span>
        <el-input v-model="collegeID" placeholder="学院ID"></el-input>
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
    name:'SubjectEdit',
    data(){
      return {
        operate:'',
        pageTitle:'',
        subjectName:'',
        collegeName:'',
        sort:'',
        collegeID:'',
        subjectID:'',
        createTime:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.collegeID=this.$route.query.collegeId;
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.subjectID){
        https.fetchPost('http://test.edrmd.com:1443/manage/subject/find',{'id':this.$route.query.subjectID}).then(res=>{
          let data=res.data.data;
          this.subjectID=data.id;
          this.collegeID=data.collegeId;
          this.createTime=data.createTime;
          this.subjectName=data.name;
          this.sort=data.sort;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      save(){
          let params={};
          params.name=this.subjectName;
          params.sort=this.sort;
          params.collegeId=this.collegeID;
          params.id=this.subjectID;
          if(this.subjectID){
            https.fetchPost('http://test.edrmd.com:1443/manage/subject/update',params).then(res=>{
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
