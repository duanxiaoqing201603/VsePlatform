<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div  class="rowDiv"><span class="smallTitle">笔记名称</span>
        <el-input v-model="noteName" placeholder="笔记名称"></el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">创建时间</span>
        <el-input v-model="createTime" placeholder="创建时间"></el-input>
      </div>
      <div v-if="operate==='edit'"  class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">3d url数组</span>
        <el-input v-model="url3d" placeholder="3d url数组">
        </el-input>
      </div>
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">笔记ID</span>
        <el-input v-model="noteID" placeholder="笔记ID"></el-input>
      </div>

      <div  class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">学科ID</span>
        <el-input v-model="subjectID" placeholder="学科ID"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">排序</span>
        <el-input v-model="sort" placeholder="排序"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">笔记内容</span>
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
        noteName:'',
        state:'',
        sort:'',
        noteID:'',
        chapterID:'',
        subjectID:'',
        createTime:'',
        url3d:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.chapterID=this.$route.query.chapterID;
      this.subjectID=this.$route.query.subjectID;
      this.noteID=this.$route.query.noteID;
      if(this.$route.query.noteID){
        https.fetchPost('http://test.edrmd.com:1443/manage/note/find',{'id':this.$route.query.noteID}).then(res=>{
          let data=res.data.data;
          this.noteName=data.name;
          this.noteID=data.id;
          this.createTime=data.createTime;
          this.url3d=data.url3d;
          this.description=data.content;
          this.state=data.state;
          this.sort=data.sort;
          this.subjectID=data.subjectId;
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
        params.name=this.noteName;
        params.sort=this.sort;
        params.subjectId=this.subjectID;
        params.id=this.noteID;
        params.content=this.description;
        params.url3d=this.url3d;
        params.chapterId=this.chapterID;
        console.log(params);
        if(this.noteID){
          https.fetchPost('http://test.edrmd.com:1443/manage/note/update',params).then(res=>{
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
          https.fetchPost('http://test.edrmd.com:1443/manage/note/add',params).then(res=>{
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
