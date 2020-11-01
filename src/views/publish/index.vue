<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{articleID?'修改文章':'发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form ref="publish-form" :model="article" label-width="60px" :rules="formRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title" ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
<!--          <el-input v-model="article.content"></el-input>-->
          <div>
            <el-tiptap
                v-model="article.content"
                :extensions="extensions"
                lang="zh"
                width="100%"
                :height="400"
                placeholder="请输入文字内容..."
            />
          </div>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{articleID?'修改':'发表'}}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import getArticleChannels from '@/api/channels'
import {addArticle,getArticle,updateArticle} from '@/api/article'
// import {uploadImage} from '@/api/images'

import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'


export default {
  name: "publishindex",
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data() {
    return {
      article:{
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        }, // 文章封面
        channel_id:null
      },
      channels:[],
      articleID:this.$route.query.id,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image(
            // {
          // urlPattern:,
        //   uploadRequest(file){
        //     const fd = new FormData()
        //     fd.append('image',file)
        //     return uploadImage(fd).then((res)=>{
        //       return console.log(res)
        //     })
        //   }
        // }
        ),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ],
      formRules: {
        title:[
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }



    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
    if(this.$route.query.id){
      this.loadArticle()
    }

  },
  mounted() {},
  methods: {
    onPublish (draft = false) {
      this.$refs['publish-form'].validate((valid)=>{
        if(!valid){
          return
        }else {
          if(this.$route.query.id){
            updateArticle(this.$route.query.id,this.article,draft).then((res)=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
          }else {
            // 请求提交表单
            addArticle(this.article, draft).then(res => {
              // 处理响应结果
              // console.log(res)
              this.$message({
                message: `${draft?'存入草稿':'发布成功'}`,
                type: 'success'
              })
              this.$router.push('/article')
            })
          }
        }
      })


    },

    loadChannels(){
      getArticleChannels().then(res=>{
        this.channels=res.data.data.channels
      })
    },

    loadArticle(){
      getArticle(this.$route.query.id).then((res)=>{
          this.article=res.data.data
      })
    },


  }
}
</script>

<style scoped lang="less">

</style>