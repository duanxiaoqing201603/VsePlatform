<template>
  <div class="SecondTitle">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row

    >
      <el-table-column prop="id" align="center" label="序号" width="150">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="list.id===2" @click="handleClick" type="text" size="small">下一级列表</el-button>
          <el-button v-if="list.id!==2" @click="handleClick" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'SecondTitle',
    data(){
      return {
        list:[
          {
            id:'1',
            title:'章节简介'
          },
          {
            id:2,
            title:'课程学习'
          },
          {
            id:'3',
            title:'教学课件'
          },
          {
            id:'4',
            title:'微课视频'
          },
          {
            id:'5',
            title:'思维导图'
          },
          {
            id:'6',
            title:'PBL教学'
          },
          {
            id:'7',
            title:'巩固练习'
          }
          ]
      }
    },
    methods:{
      handleClick(){

      }
    }

  }
</script>
