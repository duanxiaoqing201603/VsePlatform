<template>
  <div class="ChapterEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div class="rowDiv"><span class="smallTitle">学院ID</span>
        <el-input v-model="collegeID" placeholder="学院ID"></el-input>
      </div>
      <div v-if="operate==='edit'"  class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">章节名称</span>
        <el-input v-model="chapterName" placeholder="章节名称">
        </el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">学科ID</span>
        <el-input v-model="subjectID" placeholder="学科ID"></el-input>
      </div>

      <div  class="rowDiv"><span class="smallTitle">状态</span>
        <el-input v-model="state" placeholder="状态"></el-input>
      </div>
      <div  class="rowDiv"><span class="smallTitle">排序</span>
        <el-input v-model="sort" placeholder="是否排序"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">章节简介</span>
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
        chapterName:'',
        state:'',
        sort:'',
        subjectID:'',
        chapterID:''
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.collegeID=this.$route.query.collegeId;
      this.subjectID=this.$route.query.subjectID;
      if(this.$route.query.chapterID){
        https.fetchPost('http://test.edrmd.com:1443/manage/chapter/find',{'id':this.$route.query.chapterID}).then(res=>{
          let data=res.data.data;
          this.chapterName=data.name;
          this.chapterID=data.id;
          this.description=data.description;
          this.state=data.state;
          this.sort=data.sort;
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
        params.name=this.chapterName;
        params.sort=this.sort;
        params.collegeId=this.collegeID;
        params.id=this.chapterID;
        params.description=this.description;
        params.state=this.state;
        params.subjectId=this.subjectID;
        console.log(params);
        if(this.chapterID){
          https.fetchPost('http://test.edrmd.com:1443/manage/chapter/update',params).then(res=>{
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
  .ChapterEdit{
    margin:20px;
  }
  .ChapterEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .ChapterEdit .title span{
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
  .ChapterEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .ChapterEdit .collegeContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .ChapterEdit .collegeContent .smallTitle{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .ChapterEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .ChapterEdit .el-button span{
    line-height: 0;
  }
</style>
