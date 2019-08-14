<template>
    <div class="tinymce">
        <!--{{ description }}-->
        <tinymce-editor ref="editor"
                        v-model="description"
                        :disabled="disabled"
                        @onClick="onClick">
        </tinymce-editor>
        <!--<button @click="submit">提交</button>v-html="description"
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button><br/>-->
    </div>
</template>

<script>
    import TinymceEditor from '../components/tinymce-editor/tinymce-editor'
    export default {
        components: {
            TinymceEditor
        },
        props:['description'],
        data () {
          return {
            /* msg: '',*/
            //des:this.description,
            disabled: false
          }
        },
     /* created(){
          console.log('dddddddd',this.description);
      },*/
        methods: {
            // 鼠标单击的事件
            onClick (e, editor) {
                //console.log('Element clicked',this.des);
                /*console.log(e)
                console.log(editor);*/
                this.$emit('desChanged',this.description);
            },
            // 清空内容
            clear () {
                this.$refs.editor.clear()
            },
            submit(){

            }
        }
    }
</script>
<style>
  .tinymce{
    width:100%;
    border-radius: 4px;
    /*border: 1px solid #DCDFE6;*/
  }
</style>
