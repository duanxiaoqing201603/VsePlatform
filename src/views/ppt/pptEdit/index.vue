<template>
  <div class="PPTEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="pptContent">
      <div class="rowDiv"><span class="smallTitle">PPT名称</span>
        <el-input v-model="pptName" placeholder="PPT名称"></el-input>
      </div>
      <div v-if="operate==='edit'"  class="rowDiv"><span class="smallTitle">PPT ID</span>
        <el-input v-model="pptID" placeholder="PPT ID"></el-input>
      </div>
      <!--<div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">图片</span>
        <el-input v-model="images" placeholder="图片">
        </el-input>
      </div>-->
      <div class="rowDiv"><span class="smallTitle">章节ID</span>
        <el-input v-model="chapterID" placeholder="章节ID"></el-input>
      </div>
      <div  v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">文件</span>
        <el-upload
          action="http://test.edrmd.com:1443/common/upload"
          list-type="text"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!--<el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>-->
      </div>
      <div  v-if="operate==='new'" class="rowDiv"><span class="smallTitle">图片</span>
        <el-upload
                   action="http://test.edrmd.com:1443/common/upload"
                   list-type="text"
                   :file-list="newFile"
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
      <div  class="rowDiv"><span class="smallTitle">PPT文件名</span>
        <el-input v-model="fileName" placeholder="PPT文件名"></el-input>
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
    name:'PPTEdit',
    components:{
      Tinymce
    },
    data(){
      return {
        operate:'',
        pageTitle:'',
        pptName:'',
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXX
        images:'',
        sort:'',
        fileName:'',
        pptID:'',
        chapterID:'',
        newFile:[],
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[
          {
            name:'',
            url:''
          }
        ],
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      this.chapterID=this.$route.query.chapterID;
      this.pptID=this.$route.query.pptID;
      this.subjectID=this.$route.query.subjectID;
      if(this.$route.query.pptID){
        https.fetchPost('http://test.edrmd.com:1443/manage/ppt/find',{'id':this.$route.query.pptID}).then(res=>{
          let data=res.data.data;
          console.log('aaaaaaaaaaaaaaaaaaaaa',res.data.data);
          this.pptName=data.name;
          this.chapterID=data.chapterId;
          this.pptID=data.id;
          this.fileName=data.fileName;
          this.images=data.image;
          this.sort=data.sort;
          this.fileList[0].name=this.fileName;
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
        params.name=this.pptName;
        params.sort=this.sort;
        params.chapterId=this.chapterID;
        params.id=this.pptID;
        params.fileName=this.fileName;
        if(this.pptID){
          https.fetchPost('http://test.edrmd.com:1443/manage/ppt/update',params).then(res=>{
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
          https.fetchPost('http://test.edrmd.com:1443/manage/ppt/add',params).then(res=>{
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
        //console.log('remove',file,fileList);
        this.hideUpload = fileList.length >= this.limitCount;
        https.fetchPost('http://test.edrmd.com:1443/common/file/delete',{'name':this.fileName}).then(res=>{
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
        this.fileName=response.data.fileName;
      }
    }

  }
</script>
<style>
  .PPTEdit{
    margin:20px;
  }
  .PPTEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .PPTEdit .title span{
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
  .PPTEdit .pptContent{
    margin:30px 0 0 25px;
  }
  .PPTEdit .pptContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .PPTEdit .pptContent .smallTitle{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .PPTEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .PPTEdit .el-button span{
    line-height: 0;
  }
  .PPTEdit .hide .el-upload--picture-card {
    display: none;
  }
</style>
