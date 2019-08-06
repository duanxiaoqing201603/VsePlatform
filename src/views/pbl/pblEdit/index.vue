<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div class="rowDiv"><span class="smallTitle">PBL名称</span>
        <el-input v-model="PBLName" placeholder="PBL名称"></el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">PBL ID</span>
        <el-input v-model="pblID" placeholder="PBL ID"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID">
        </el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">问答数组</span>
        <el-input v-model="question" placeholder="问答数组"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">图片数组</span>
        <el-input v-model="image" placeholder="图片数组"></el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">内容</span>
      <!--<el-input v-model="description" placeholder="章节简介"></el-input>-->
      <Tinymce :description="description" @desChanged="updatedes($event)"></Tinymce>
    </div>
      <div  class="rowDiv">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import Tinymce from '../../Tinymce'
  import {Message,MessageBox} from 'element-ui'
  export default {
    name:'ChapterEdit',
    components:{
      Tinymce
    },
    data(){
      return {
        operate:'',
        pageTitle:'',
        description:'',
        PBLName:'',
        state:'',
        sort:'',
        pblID:'',
        image:'',
        chapterID:'',
        createTime:'',
        question:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.chapterID=this.$route.query.chapterID;
      this.pblID=this.$route.query.pblID;
      if(this.$route.query.pblID){
        https.fetchPost('http://test.edrmd.com:1443/manage/pbl/find',{'id':this.$route.query.pblID}).then(res=>{
          let data=res.data.data;
          console.log(res);
          this.PBLName=data.name;
          this.createTime=data.createTime;
          this.chapterID=data.chapterId;
          this.pblID=data.id;
          this.description=data.content;
          this.image=data.image;
          this.question=data.question;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    methods:{
      updatedes(el){
        this.description=el;
      },
      save(){
        let params={};
        params.name=this.PBLName;
        params.chapterId=this.chapterID;
        params.content=this.description;
        params.question=this.question;
        params.image=this.image;
        params.id=this.pblID;
        if(this.pblID){
          https.fetchPost('http://test.edrmd.com:1443/manage/pbl/update',params).then(res=>{
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
          https.fetchPost('http://test.edrmd.com:1443/manage/chapter/add',params).then(res=>{
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
  .CollegeEdit .collegeContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .CollegeEdit .collegeContent .smallTitle{
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
