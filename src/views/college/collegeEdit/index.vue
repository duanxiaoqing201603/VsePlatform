<template>
  <div class="CollegeEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div v-if="operate==='edit'" class="rowContent"><span class="rowTitle">学院ID</span>
        <el-input v-model="collegeID" placeholder="学院ID"></el-input>
      </div>
      <div class="rowContent"><span class="rowTitle">学院名称</span>
        <el-input v-model="collegeName" placeholder="学院名称"></el-input>
      </div>
      <div  v-if="operate==='edit'" class="rowContent"><span class="rowTitle">图片</span>
        <!--<el-upload
          class="upload-demo"
          action="http://test.edrmd.com:1443/common/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
        <el-upload :class="{hide:hideUpload}"
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
      <div  v-if="operate==='new'" class="rowContent"><span class="rowTitle">图片</span>
        <el-upload :class="{hide:hideUpload}"
                   action="http://test.edrmd.com:1443/common/upload"
                   list-type="picture-card"
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
      <div class="rowContent" v-if="operate==='edit'"><span class="rowTitle">图片URL</span>
        <el-input v-model="imageUrl" placeholder="图片URL"></el-input>
      </div>
      <div class="rowContent" v-if="operate==='new'"><span class="rowTitle">图片名称</span>
        <el-input v-model="imageName" placeholder="上传后返回的图片名称"></el-input>
      </div>
      <div class="rowContent"><span class="rowTitle">是否在首页展现</span>
        <!--<el-input v-model="homeShow" placeholder="是否在首页展现：1、展现"></el-input>-->
        <el-radio v-model="homeShow" label="1">是</el-radio>
        <el-radio v-model="homeShow" label="2">否</el-radio>
      </div>
      <div class="rowContent"><span class="rowTitle">排序</span>
        <el-radio v-model="sort" :label="1">是</el-radio>
        <el-radio v-model="sort" :label="2">否</el-radio>
      </div>
      <div class="rowContent">
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
        collegeName:'',
        imageName:'',
        homeShow:'1',
        sort:1,
        collegeID:'',
        imageUrl:'',
        createTime:'',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[
          {
            name:'',
            url:''
          }
        ],
        hideUpload: false,
        limitCount:1,
        newFile:[]
      }
    },
    created(){
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.collegeID){
        https.fetchPost('http://test.edrmd.com:1443/manage/college/find',{'id':this.$route.query.collegeID}).then(res=>{
          let data=res.data.data;
          console.log('college',data);
          this.collegeName=data.name;
          this.collegeID=data.id;
          this.imageUrl=data.image;
          this.createTime=data.createTime;
          this.homeShow=data.homeShow;
          this.sort=data.sort;
          console.log('sortsort',typeof this.sort);
          this.fileList[0].url=this.imageUrl;
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
      },
      handleChange(file,fileList){
        this.hideUpload = fileList.length >= this.limitCount;
      },
      handleRemove(file, fileList) {
        console.log('remove',file,fileList);
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
        this.imageName=response.data.fileName;
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
  .CollegeEdit .collegeContent .rowContent{
    display: flex;
    margin-bottom:15px;
  }
  .CollegeEdit .collegeContent .rowTitle{
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
  .CollegeEdit .hide .el-upload--picture-card {
    display: none;
  }
</style>
