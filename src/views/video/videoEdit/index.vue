<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div class="rowDiv"><span class="smallTitle">视频名称</span>
        <el-input v-model="videoName" placeholder="视频名称"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间">
        </el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">视频ID</span>
        <el-input v-model="id" placeholder="视频ID"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">阿里云视频ID</span>
        <el-input v-model="videoID" placeholder="阿里云视频ID"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">浏览量</span>
        <el-input v-model="browserNum" placeholder="浏览量"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">排序</span>
        <el-input v-model="sort" placeholder="是否排序"></el-input>
      </div>
      <!--<div class="rowDiv"><span class="smallTitle">章节简介</span>
      &lt;!&ndash;<el-input v-model="description" placeholder="章节简介"></el-input>&ndash;&gt;
      <Tinymce :description="description" @desChanged="updatedes($event)"></Tinymce>
    </div>-->
      <div  class="rowDiv">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import Tinymce from '../../Tinymce'
  import {Message} from 'element-ui'
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
        videoName:'',
        state:'',
        sort:'',
        id:'',
        videoID:'',
        chapterID:'',
        createTime:'',
        browserNum:'',
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.id=this.$route.query.id;
      this.chapterID=this.$route.query.chapterID;
      if(this.$route.query.id){
        https.fetchPost('http://test.edrmd.com:1443/manage/video/find',{'id':this.$route.query.id}).then(res=>{
          let data=res.data.data;
          this.videoName=data.name;
          this.id=data.id;
          this.videoID=data.videoId;
          this.createTime=data.createTime;
          this.sort=data.sort;
          this.browserNum=data.browserNum;
          this.chapterID=data.chapterId;
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
        params.name=this.videoName;
        params.sort=this.sort;
        params.chapterId=this.chapterID;
        params.id=this.id;
        params.videoId=this.videoID;
        params.browserNum=this.browserNum;
        if(this.chapterID){
          https.fetchPost('http://test.edrmd.com:1443/manage/video/update',params).then(res=>{
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
