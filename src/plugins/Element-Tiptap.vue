<template>

    <el-tiptap
        v-model="content"
        :extensions="extensions"
        lang="zh"
        width="100%"
        :height="400"
    />

</template>

<script>
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  SelectAll,
  FontType,
  FontSize
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

  export default {
    name: "Element-Tiptap",
    components: {
      'el-tiptap': ElementTiptap,
    },
    props: {},
    data() {
      return {
        extensions: [
          new Doc({
            title: true,
          }),
          new Paragraph(),
          new Text(),
          new Heading({
            level: 5
          }),
          new Bold(),
          new Italic(),
          new Underline(),
          new Strike(),
          new Code(),
          new CodeBlock(),
          new Blockquote(),
          new Link(),
          new Image(),
          new BulletList(),
          new ListItem(),
          new TodoList(),
          new TodoItem(),
          new Iframe(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableRow(),
          new TableCell(),
          new TextAlign(),
          new LineHeight(),
          new Indent(),
          new HorizontalRule(),
          new HardBreak(),
          new TrailingNode(),
          new History(),
          new TextColor(),
          new TextHighlight(),
          new FormatClear(),
          new FontType(),
          new FontSize(),
          new Preview(),
          new Print(),
          new Fullscreen(),
          new SelectAll()
        ]
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped>

</style>