<template>
  <div class="PBLEdit">
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

      <div  class="rowDiv"><span class="smallTitle">图片</span>
        <el-upload
                   action="http://test.edrmd.com:1443/common/upload"
                   list-type="picture-card"
                   :file-list="fileList"
                   :on-success="handleSuccess"
                   :on-change="handleChange"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="rowDiv"><span class="smallTitle">内容</span>
      <!--<el-input v-model="description" placeholder="章节简介"></el-input>-->
      <Tinymce :description="description" @desChanged="updatedes($event)"></Tinymce>
      </div>
      <!--<div class="rowDiv"><span class="smallTitle">问答数组</span>
        <el-input v-model="question" placeholder="问答数组"></el-input>
      </div>-->
      <div>
        <div class="rowDiv" v-for="(item,index) in questionGroup" :key="index"><span class="smallTitle">题目{{index+1}}</span>
          <el-input v-model="questionGroup[index].question" placeholder="问题">{{questionGroup[index].question}}</el-input>
          <el-input v-model="questionGroup[index].answer" placeholder="答案">{{questionGroup[index].answer}}</el-input>
        </div>
      </div>
      <div>
        <el-button @click="newAdd">新增一项</el-button><el-button @click="newDel">删除一项</el-button>
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
    name:'PBLEdit',
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
        image:[],
        chapterID:'',
        createTime:'',
        questionGroup:[
          {
            question:'',
            answer:''
          }
        ],
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        imageName:[]
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
          console.log('dddddd',data);
          this.PBLName=data.name;
          this.createTime=data.createTime;
          this.chapterID=data.chapterId;
          this.pblID=data.id;
          this.description=data.content;
          this.image=data.image;
          this.questionGroup=data.question;
          console.log('this.image dddddd',this.image);
          for(let i=0;i<this.image.length;i++){
            this.fileList.push({'url':this.image[i]});
          }
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
        params.question=this.questionGroup;
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
          https.fetchPost('http://test.edrmd.com:1443/manage/pbl/add',params).then(res=>{
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
      },
      handleChange(file,fileList){
        this.hideUpload = fileList.length >= this.limitCount;
      },
      handleRemove(file, fileList) {
        console.log('this.image',this.image);
        console.log('file.url',file.url);
        console.log('indexof',this.image.indexOf(file.url));
        if(this.image.indexOf(file.url) >= 0){
          for(let i=0;i<this.image.length;i++){
            if(this.image[i]===file.url){
              this.image.splice(i,1);
            }
          }
        }
        console.log('this.image',this.image);
        this.hideUpload = fileList.length >= this.limitCount;
        https.fetchPost('http://test.edrmd.com:1443/common/file/delete',{'name':this.imageName}).then(res=>{
          console.log('remove');
        }).catch(err=>{
          console.log(err);
        })
      },
      //图片预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList){
        /*this.imageUrl=response.data.fileUrl;*/
        this.image.push(response.data.fileName);
      },
      newAdd(){
        this.questionGroup.push({
          question:'',
          answer:''
        });
      },
      newDel(){
        this.questionGroup.pop({
          question:'',
          answer:''
        });
      }
    }

  }
</script>
<style>
  .PBLEdit{
    margin:20px;
  }
  .PBLEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .PBLEdit .title span{
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
  .PBLEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .PBLEdit .collegeContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .PBLEdit .collegeContent .smallTitle{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .PBLEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .PBLEdit .el-button span{
    line-height: 0;
  }
</style>
