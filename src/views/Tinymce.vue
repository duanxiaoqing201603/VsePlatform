<template>
    <div>
        {{ msg }}
        <tinymce-editor ref="editor"
                        v-model="msg"
                        :disabled="disabled"
                        @onClick="onClick">
        </tinymce-editor>
        <button @click="submit">提交</button>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button><br/>
    </div>
</template>

<script>
    import TinymceEditor from '../components/tinymce-editor/tinymce-editor'
    export default {
        components: {
            TinymceEditor
        },
        data () {
            return {
                msg: 'Welcome to Use Tinymce Editor',
                disabled: false
            }
        },
        methods: {
            // 鼠标单击的事件
            onClick (e, editor) {
                console.log('Element clicked')
                console.log(e)
                console.log(editor)
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
