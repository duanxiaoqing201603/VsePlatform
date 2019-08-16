<template>
  <div class="ExperimentEdit">
    <div class="title"><span>{{pageTitle}}</span></div>
    <div class="collegeContent">
      <div v-if="operate==='edit'" class="rowDiv"><span class="smallTitle">实验ID</span>
        <el-input v-model="experimentID" placeholder="实验ID"></el-input>
      </div>
      <div class="rowDiv"><span class="smallTitle">实验名称</span>
        <el-input v-model="experimentName" placeholder="实验名称"></el-input>
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
        <Tinymce :description="description" @desChanged="updatedes($event)"></Tinymce>
      </div>
      <div class="rowDiv"><span class="smallTitle">3DURL</span>
        <el-input v-model="URL3D" placeholder="3DURL"></el-input>
      </div>
      <!--<div class="rowDiv" v-if="operate==='new'"><span class="smallTitle">图片名称</span>
        <el-input v-model="imageName" placeholder="上传后返回的图片名称"></el-input>
      </div>-->
      <div class="rowDiv">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import https from '../../../https'
  import {Message} from 'element-ui'
  import Tinymce from '../../Tinymce'
  export default {
    name:'ExperimentEdit',
    components:{
      Tinymce
    },
    data(){
      return {
        operate:'',
        pageTitle:'',
        imageName:[],
        experimentName:'',
        experimentID:'',
        URL3D:'',
        description:'',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        image:[]
      }
    },
    created(){
      this.imageName=[];
      this.operate=this.$route.query.operate;
      this.pageTitle=this.operate==='edit'?'编辑':'新建';
      this.$route.meta.title=this.pageTitle;
      if(this.$route.query.experimentID){
        https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/base/find',{'id':this.$route.query.experimentID}).then(res=>{
          let data=res.data.data;
          this.experimentName=data.name;
          this.experimentID=data.id;
          this.URL3D=data.url3d;
          this.description=data.content;
          this.image=data.image;
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
        params.image=this.imageName;
        params.name=this.experimentName;
        params.url3d=this.URL3D;
        params.content=this.description;
        params.id=this.experimentID;
        if(this.experimentID){
          https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/base/update',params).then(res=>{
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
            https.fetchPost('http://test.edrmd.com:1443/manage/experiment3d/base/add',params).then(res=>{
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
        console.log('remove',file,this.imageName);
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
        this.imageName.push(response.data.fileName);
        console.log('dkjkkkkkkkkkkkk',this.imageName);
      }
    }
  }
</script>
<style>
  .ExperimentEdit{
    margin:20px;
  }
  .ExperimentEdit .title{
    height: 36px;
    border-bottom: solid 1px #d0dee5;
    border-left: solid 1px #d0dee5;
  }
  .ExperimentEdit .title span{
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
  .ExperimentEdit .collegeContent{
    margin:30px 0 0 25px;
  }
  .ExperimentEdit .collegeContent .rowDiv{
    display: flex;
    margin-bottom:15px;
  }
  .ExperimentEdit .collegeContent .smallTitle{
    width:150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .ExperimentEdit .el-button{
    margin-left: 130px;
    width:150px;
    height:40px;
  }
  .ExperimentEdit .el-button span{
    line-height: 0;
  }
</style>
